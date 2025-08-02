const express = require("express");
const router = express.Router();
const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getSellerOrders,
    getSellerProducts,
} = require("../controller/productController");
const { protectUser } = require("../middleware/authMiddleware");
const { upload } = require("../utils/cloudinary");

router.post("/create-product", protectUser, upload.single("image"), createProduct);
router.get("/get-all-products", getProducts)
router.get("/get-product/:id", getProductById)
router.get("/get-seller-orders", protectUser, getSellerOrders)
router.get("/get-seller-products", protectUser, getSellerProducts)

router.put("/update-product/:id", protectUser, upload.single("image"), updateProduct)
router.delete("/delete-product/:id", protectUser, deleteProduct);

module.exports = router;