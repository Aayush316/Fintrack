const mongoose = require('mongoose');

// Function to convert current date and time to IST
const getCurrentISTDateTime = () => {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000; // IST offset from UTC in milliseconds (5 hours and 30 minutes)
    const istTime = new Date(now.getTime() + istOffset);
    return istTime;
};

const expenseSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    expense: {
        type: Number,
        required: true
    },
    product: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["Entertainment", "Clothing", "Food", "Miscellaneous"]
    },
    budget: {
        type: Number,
        required: true
    },
    Date: {
        type: Date,
        default: getCurrentISTDateTime
    }
});

module.exports = mongoose.model("Expense", expenseSchema);
