const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logoutUser, getUser, deleteUser, updateUser, updateUserProfileImage, deleteUserProfileImage, toggleCart, getCart } = require("../controller/userController");
const { protectUser } = require("../middleware/authMiddleware");
const { upload } = require("../utils/cloudinary");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", protectUser, logoutUser);
router.get("/get-user", protectUser, getUser);
router.put('/toggle-cart/:productId', protectUser, toggleCart);
router.get('/get-cart', protectUser, getCart);
router.put('/update-user', protectUser, updateUser);
router.delete("/delete-user", protectUser, deleteUser);
router.put('/upload-profile-image', protectUser, upload.single('image'), updateUserProfileImage)
router.delete("/delete-profile-image", protectUser, deleteUserProfileImage);

module.exports = router;