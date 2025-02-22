import React, { useState } from "react";
import "./BudgetManager.css";

export default function BudgetManager() {
    const [budgetForm, setBudgetForm] = useState(false);
    const [budgets, setBudgets] = useState([]);
    const [newBudget, setNewBudget] = useState({ category: "", amount: "" });

    // Handle input changes in the form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBudget((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newBudget.category || !newBudget.amount) {
            alert("Please fill in all fields.");
            return;
        }

        // Add the new budget to the list
        setBudgets((prev) => [...prev, newBudget]);

        // Reset the form
        setNewBudget({ category: "", amount: "" });
        setBudgetForm(false);
    };

    return (
        <div className="budget-manager-container">
            {/* Button to open the budget form */}
            <button onClick={() => setBudgetForm(true)} className="add-budget-btn">
                Add Budget
            </button>

            {/* Form for adding a new budget */}
            {budgetForm && (
                <form onSubmit={handleSubmit} className="budget-form">
                    <h3>Add New Budget</h3>
                    <div className="form-group">
                        <label>Category:</label>
                        <input
                            type="text"
                            name="category"
                            value={newBudget.category}
                            onChange={handleInputChange}
                            placeholder="Enter Category"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Budget Amount:</label>
                        <input
                            type="number"
                            name="amount"
                            value={newBudget.amount}
                            onChange={handleInputChange}
                            placeholder="Enter Amount"
                            required
                        />
                    </div>
                    <div className="form-buttons">
                        <button type="submit" className="submit-btn">
                            Submit
                        </button>
                        <button
                            type="button"
                            onClick={() => setBudgetForm(false)}
                            className="cancel-btn"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            {/* Table to display budgets */}
            <div className="budget-table-container">
                <h3>Budget Overview</h3>
                <table className="budget-table">
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Budget Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {budgets.length > 0 ? (
                            budgets.map((budget, index) => (
                                <tr key={index}>
                                    <td>{budget.category}</td>
                                    <td>{budget.amount}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2">No budgets added yet.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}