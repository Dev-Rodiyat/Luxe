const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getMyOrders,
  getSellerOrders,
  updateOrderStatus,
  cancelOrder,
} = require("../controller/orderController");
const { protectUser } = require("../middleware/authMiddleware");

router.post("/create-order", protectUser, createOrder);
router.get("/my-orders", protectUser, getMyOrders);
router.put("/cancel-order/:id", protectUser, cancelOrder);
router.get("/seller-orders", protectUser, getSellerOrders);
router.get("/get-all-orders", protectUser, getAllOrders);
router.put("/update-order-status/:id", protectUser, updateOrderStatus);

module.exports = router;
