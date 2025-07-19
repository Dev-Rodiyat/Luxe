const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
    },
    type: {
        type: String,
        enum: ['Income', 'Expense'],
        required: true,
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required'],
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Other'],
    },
    paymentMethod: {
        type: String,
        enum: ['Cash', 'Card', 'UPI', 'Bank Transfer', 'Other'],
        default: 'Other',
    },
    note: {
        type: String,
        trim: true,
    },
    date: {
        type: Date,
        required: true,
    },
}, { timestamps: true });

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = { Expense }