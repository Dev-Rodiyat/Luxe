const asyncHandler = require("express-async-handler");
const { Product } = require("../model/ProductModel");
const { Order } = require("../model/OrderModel");
const { User } = require("../model/userModel");
const Notification = require("../model/notificationModel");

const createOrder = asyncHandler(async (req, res) => {
    const { products } = req.body;

    if (!products || products.length === 0) {
        res.status(400);
        throw new Error("No products in the order");
    }

    let totalAmount = 0;
    const detailedProducts = [];

    for (const item of products) {
        const product = await Product.findById(item.product);
        if (!product || product.quantity < item.quantity) {
            res.status(400);
            throw new Error("Invalid product or insufficient stock");
        }

        if (product.seller.toString() === req.userId) {
            res.status(403);
            throw new Error("You cannot purchase your own product");
        }

        totalAmount += product.price * item.quantity;
        detailedProducts.push({ product: product._id, quantity: item.quantity });

        product.quantity -= item.quantity;
        await product.save();
    }

    const order = new Order({
        buyer: req.userId,
        products: detailedProducts,
        totalAmount,
    });

    const created = await order.save();

    await User.findByIdAndUpdate(req.userId, {
        $push: { orders: created._id }
    });

    await Notification.create({
        user: req.userId,
        type: "order",
        message: `Your order totaling $${totalAmount.toFixed(2)} was placed successfully.`,
        metadata: {
            orderId: created._id,
            action: "create",
        },
    });

    const notifiedSellerIds = new Set();

    for (const item of detailedProducts) {
        const product = await Product.findById(item.product).select("seller name");

        if (product && !notifiedSellerIds.has(product.seller.toString())) {
            await Notification.create({
                user: product.seller,
                type: "order",
                message: `A new order was placed that includes your product "${product.name}".`,
                metadata: {
                    orderId: created._id,
                    productId: product._id,
                    action: "incoming",
                },
            });

            notifiedSellerIds.add(product.seller.toString());
        }
    }

    // Return created order so frontend can call /payment/initiate
    res.status(201).json({
        orderId: created._id,
        totalAmount: created.totalAmount
    });
});

const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find().populate("buyer", "name").populate("products.product", "name price");
    res.json(orders);
});

const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ buyer: req.userId }).populate("products.product", "name price");
    res.json(orders);
});

const getSellerOrders = asyncHandler(async (req, res) => {
    const products = await Product.find({ seller: req.userId }).select("_id");
    const productIds = products.map((p) => p._id);

    const orders = await Order.find({
        "products.product": { $in: productIds }
    })
        .populate("buyer", "name")
        .populate("products.product", "name price seller");

    res.json(orders);
});

const updateOrderStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
        res.status(404);
        throw new Error("Order not found");
    }

    order.status = status;
    const updated = await order.save();

    await Notification.create({
        user: order.buyer,
        type: "order",
        message: `Your order (${order._id}) status was updated to "${order.status}".`,
        metadata: {
            orderId: order._id,
            action: "status-update",
            status: order.status,
        },
    });

    res.json(updated);
});

const cancelOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        res.status(404);
        throw new Error("Order not found");
    }

    if (order.buyer.toString() !== req.userId) {
        res.status(403);
        throw new Error("Not authorized to cancel this order");
    }

    if (order.status !== "pending") {
        res.status(400);
        throw new Error("Only pending orders can be cancelled");
    }

    order.status = "cancelled";
    await order.save();
    await Notification.create({
        user: req.userId,
        type: "order",
        message: `You have successfully cancelled your order (${order._id}).`,
        metadata: {
            orderId: order._id,
            action: "cancel",
        },
    });

    const sellerProductIds = order.products.map(p => p.product);
    const sellerProducts = await Product.find({ _id: { $in: sellerProductIds } }).select("seller name");

    const notifiedSellers = new Set();

    for (const product of sellerProducts) {
        if (!notifiedSellers.has(product.seller.toString())) {
            await Notification.create({
                user: product.seller,
                type: "order",
                message: `An order involving your product "${product.name}" was cancelled by the buyer.`,
                metadata: {
                    orderId: order._id,
                    productId: product._id,
                    action: "cancelled-by-buyer",
                },
            });

            notifiedSellers.add(product.seller.toString());
        }
    }

    res.json({ message: "Order cancelled" });
});

module.exports = {
    createOrder,
    getAllOrders,
    getMyOrders,
    getSellerOrders,
    updateOrderStatus,
    cancelOrder,
};
