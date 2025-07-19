const { Expense } = require("../model/expenseModel");
const Notification = require("../model/notificationModel");

const createExpense = async (req, res) => {
    const { title, amount, category, paymentMethod, note, date, type } = req.body;

    if (!title || !amount || !category || !date || !type) {
        return res.status(400).json({ message: 'Please provide all required fields including type' });
    }

    try {
        const expense = await Expense.create({
            user: req.userId,
            title,
            amount,
            category,
            paymentMethod,
            note,
            date,
            type,
        });

        await Notification.create({
            user: req.userId,
            type: 'expense',
            message: `You created a new expense: ${expense.title}`,
            metadata: { expenseId: expense._id },
        });

        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.userId }).sort({ createdAt: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getExpenseById = async (req, res) => {
    const { id } = req.params;

    try {
        const expense = await Expense.findOne({ _id: id, user: req.userId });

        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const updateExpense = async (req, res) => {
    const { id } = req.params;

    try {
        const expense = await Expense.findOne({ _id: id, user: req.user._id || req.userId });
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        const updated = await Expense.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        await Notification.create({
            user: req.userId,
            type: 'expense',
            message: `You updated an expense: ${expense.title}`,
            metadata: { expenseId: expense._id },
        });

        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const deleteExpense = async (req, res) => {
    const { id } = req.params;

    try {
        const expense = await Expense.findOne({ _id: id, user: req.userId });
        if (!expense) return res.status(404).json({ message: 'Expense not found' });

        await expense.deleteOne();

        await Notification.create({
            user: req.userId,
            type: 'expense',
            message: `You deleted an expense: ${expense.title}`,
            metadata: { expenseId: expense._id },
        });

        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { createExpense, getExpenses, getExpenseById, updateExpense, deleteExpense }