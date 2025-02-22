const BudgetCategory = require("../models/budgetModel");

// Get budget categories for a specific user by email
exports.getUserBudgetCategories = async (req, res) => {
    try {
        const { email } = req.params;
        console.log("hioo")
        if (!email) return res.status(400).json({ error: "User email is required." });

        const categories = await BudgetCategory.find({ email }) // Exclude MongoDB version field
        // console.log(categories)
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: "Error fetching budget categories." });
    }
};

// Add a new budget category
exports.addBudgetCategory = async (req, res) => {
    console.log(req.body)
    try {
        const { email, category, budget} = req.body;

        if (!email || !category || !budget) {
            return res.status(400).json({ error: "All fields are required." });
        }
        
        const findBool=await BudgetCategory.find({category})
        console.log(findBool)

        if(!findBool){
            const newCategory = await BudgetCategory.create({ email, category, budget});
            
            res.status(200).json({
                success:true,
                budget:newCategory,
                message:"New Category created Successfully"
            });
        }
        else{
            console.log("I am here")
            res.status(400).json({
                success:false,
                message:"Budget category already exists"
            })
        }
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
