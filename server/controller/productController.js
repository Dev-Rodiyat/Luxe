const asyncHandler = require("express-async-handler");
const { cloudinary } = require("../utils/cloudinary");
const { Product } = require("../model/ProductModel");
const { User } = require("../model/userModel");
const Notification = require("../model/notificationModel");
const VALID_CATEGORIES = ["Electronics", "Clothing", "Books", "Beauty", "Home", "Toys", "Other"];

const createProduct = asyncHandler(async (req, res) => {
    const { name, price, quantity, description, category } = req.body;

    if (!req.file) {
        res.status(400);
        throw new Error("Product image is required");
    }

    if (!VALID_CATEGORIES.includes(category)) {
        res.status(400);
        throw new Error("Invalid category. Choose from: " + VALID_CATEGORIES.join(", "));
    }

    const image = req.file.path;
    const imagePublicId = req.file.filename;

    const product = new Product({
        seller: req.userId,
        name,
        price,
        quantity,
        description,
        category,
        image,
        imagePublicId,
    });

    const created = await product.save();

    await User.findByIdAndUpdate(req.userId, {
        $push: { products: created._id }
    });

    await Notification.create({
        user: req.userId,
        type: "product",
        message: `Your product "${created.name}" has been listed successfully.`,
        metadata: {
            productId: created._id,
            action: "create",
        },
    });

    res.status(201).json(created);
});

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find()
        .sort({ createdAt: -1 })
        .populate("seller", "name");

    res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate("seller", "name");

    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    res.json(product);
});

const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, quantity, description, category } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    if (product.seller.toString() !== req.userId) {
        res.status(403);
        throw new Error("Not authorized to update this product");
    }

    if (category && !VALID_CATEGORIES.includes(category)) {
        res.status(400);
        throw new Error("Invalid category. Choose from: " + VALID_CATEGORIES.join(", "));
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.quantity = quantity || product.quantity;
    product.description = description || product.description;
    product.category = category || product.category;

    if (req.file) {
        if (product.imagePublicId) {
            await cloudinary.uploader.destroy(product.imagePublicId);
        }
        product.image = req.file.path;
        product.imagePublicId = req.file.filename;
    }

    const updated = await product.save();
    await Notification.create({
        user: req.userId,
        type: "product",
        message: `Your product "${updated.name}" was updated successfully.`,
        metadata: {
            productId: updated._id,
            action: "update",
        },
    });
    res.json(updated);
});

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    if (product.seller.toString() !== req.userId) {
        res.status(403);
        throw new Error("Not authorized to delete this product");
    }

    if (product.imagePublicId) {
        await cloudinary.uploader.destroy(product.imagePublicId);
    }

    await Notification.create({
        user: req.userId,
        type: "product",
        message: `Your product "${product.name}" was deleted.`,
        metadata: {
            productId: product._id,
            action: "delete",
        },
    });

    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
});

module.exports = {
    createProduct, getProductById, getProducts, updateProduct, deleteProduct
}