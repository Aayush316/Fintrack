const BudgetCategory = require("../models/budgetModel");

// Get budget categories for a specific user by email
exports.getUserBudgetCategories = async (req, res) => {
    try {
        const { email } = req.params;
        if (!email) return res.status(400).json({ error: "User email is required." });

        const categories = await BudgetCategory.find({ email });
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: "Error fetching budget categories." });
    }
};

// Add a new budget category (Prevents duplicate categories)
exports.addBudgetCategory = async (req, res) => {
    try {
        const { email, category, budget } = req.body;

        if (!email || !category || !budget) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Check if the user already has this category
        const existingCategory = await BudgetCategory.findOne({ email, category });

        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: "This category already exists for your account."
            });
        }

        // Create new category if not found
        const newCategory = await BudgetCategory.create({ email, category, budget });

        res.status(200).json({
            success: true,
            budget: newCategory,
            message: "New category created successfully."
        });

    } catch (error) {
        res.status(500).json({ error: "Error saving budget category." });
    }
};


// Delete a budget category
exports.deleteBudgetCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await BudgetCategory.findByIdAndDelete(id);
        res.status(200).json({ message: "Budget category deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: "Error deleting budget category." });
    }
};
