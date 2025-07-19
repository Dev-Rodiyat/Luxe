const express = require("express");
const router = express.Router();
const { createExpense, getExpenses, getExpenseById, updateExpense, deleteExpense } = require("../controller/expenseController");
const { protectUser } = require("../middleware/authMiddleware");

router.route('/create-expense').post(protectUser, createExpense)
router.route('/get-all-expenses').get(protectUser, getExpenses);
router.route('/get-expense/:id').get(protectUser, getExpenseById)
router.route('/update-expense/:id').put(protectUser, updateExpense)
router.route('/delete-expense/:id').delete(protectUser, deleteExpense);

module.exports = router;