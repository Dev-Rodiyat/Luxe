const express = require("express");
const router = express.Router();
const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} = require("../controller/productController");
const { protectUser } = require("../middleware/authMiddleware");
const { upload } = require("../utils/cloudinary");

router.post("/create-product", protectUser, upload.single("image"), createProduct);
router.get("/get-all-products", getProducts)
router.get("/get-product/:id", getProductById)

router.put("/update-product/:id", protectUser, upload.single("image"), updateProduct)
router.delete("/delete-product/:id", protectUser, deleteProduct);

module.exports = router;