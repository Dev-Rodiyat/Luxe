const axios = require("axios");
const asyncHandler = require("express-async-handler");
const { Order } = require("../model/OrderModel");
const { Notification } = require("../model/notificationModel");
const { Product } = require("../model/ProductModel");

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;

const initiatePayment = asyncHandler(async (req, res) => {
    const { orderId, email } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
        res.status(404);
        throw new Error("Order not found");
    }

    const response = await axios.post(
        "https://api.paystack.co/transaction/initialize",
        {
            email,
            amount: order.totalAmount * 100,
            metadata: {
                orderId: order._id.toString(),
                buyer: order.buyer.toString()
            },
        },
        {
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET}`,
                "Content-Type": "application/json",
            },
        }
    );

    res.status(200).json(response.data.data); // contains authorization_url
});

const verifyPayment = asyncHandler(async (req, res) => {
    const { reference } = req.params;

    const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
        headers: {
            Authorization: `Bearer ${PAYSTACK_SECRET}`,
        },
    });

    const data = response.data.data;

    if (data.status !== "success") {
        res.status(400);
        throw new Error("Payment not successful");
    }

    const orderId = data.metadata.orderId;

    const order = await Order.findById(orderId).populate("products.product");
    if (!order) {
        res.status(404);
        throw new Error("Order not found");
    }

    order.status = "paid";
    await order.save();

    // Notify buyer
    await Notification.create({
        user: order.buyer,
        type: "payment",
        message: `Payment for your order of $${order.totalAmount.toFixed(2)} was successful.`,
        metadata: {
            orderId: order._id,
            action: "payment-success",
        },
    });

    // Notify each seller again on successful payment
    const notifiedSellerIds = new Set();

    for (const item of order.products) {
        const product = item.product;
        if (product && !notifiedSellerIds.has(product.seller.toString())) {
            await Notification.create({
                user: product.seller,
                type: "payment",
                message: `An order containing your product "${product.name}" has been paid.`,
                metadata: {
                    orderId: order._id,
                    productId: product._id,
                    action: "payment-received",
                },
            });

            notifiedSellerIds.add(product.seller.toString());
        }
    }

    res.json({ message: "Payment verified", order });
});

module.exports = {
    initiatePayment,
    verifyPayment,
};
