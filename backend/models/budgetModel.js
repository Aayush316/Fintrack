const mongoose = require("mongoose");

const getCurrentISTDateTime = () => {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000; // IST offset from UTC in milliseconds (5 hours and 30 minutes)
    const istTime = new Date(now.getTime() + istOffset);
    return istTime;
};

const budgetCategorySchema = new mongoose.Schema({
    email: { type: String, required: true }, // Store user email
    category: { type: String, required: true },
    budget: { type: Number, required: true },
    date: { 
        type: Date,
        default: getCurrentISTDateTime} // Store date in YYYY-MM-DD format
});

module.exports = mongoose.model("BudgetCategory", budgetCategorySchema);
