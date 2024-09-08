import React, { useState } from 'react';
import './CustomerData.css'; // Import the CSS
import Navbar from './Navbar';

function CustomerData() {
    const [formData, setFormData] = useState({
        income: '',
        expenses: '',
        goals: '',
        currentSavings: '',
        investments: '',
        debt: '',
        riskProfile: '',
        age: '',
        dependents: '',
        savingsRatio: '',
    });

    const [savingsPlan, setSavingsPlan] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/savings-plan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status}`);
            }

            const data = await response.json();
            setSavingsPlan(data.savingsPlan);
        } catch (error) {
            console.error('Error generating savings plan', error);
        }
    };

    return (
        <div className='completeCustomerData'>
            <div className="nav">
                <Navbar />
            </div>
            <div className="container">
                <div className="form-section">
                    <form onSubmit={handleSubmit}>
                        <label className="form-label">Monthly Income</label>
                        <input 
                            name="income" 
                            className="form-input" 
                            placeholder="Monthly Income" 
                            onChange={handleChange} 
                        />
                        <label className="form-label">Monthly Expenses</label>
                        <input 
                            name="expenses" 
                            className="form-input" 
                            placeholder="Monthly Expenses" 
                            onChange={handleChange} 
                        />
                        <label className="form-label">Savings Goals</label>
                        <input 
                            name="goals" 
                            className="form-input" 
                            placeholder="Savings Goals" 
                            onChange={handleChange} 
                        />
                        <label className="form-label">Current Savings</label>
                        <input 
                            name="currentSavings" 
                            className="form-input" 
                            placeholder="Current Savings" 
                            onChange={handleChange} 
                        />
                        <label className="form-label">Investments</label>
                        <input 
                            name="investments" 
                            className="form-input" 
                            placeholder="Investments" 
                            onChange={handleChange} 
                        />
                        <label className="form-label">Debt Information</label>
                        <input 
                            name="debt" 
                            className="form-input" 
                            placeholder="Debt Information" 
                            onChange={handleChange} 
                        />
                        <label className="form-label">Investment Risk Profile</label>
                        <input 
                            name="riskProfile" 
                            className="form-input" 
                            placeholder="Investment Risk Profile" 
                            onChange={handleChange} 
                        />
                        <label className="form-label">Age</label>
                        <input 
                            name="age" 
                            className="form-input" 
                            placeholder="Age" 
                            onChange={handleChange} 
                        />
                        <label className="form-label">Number of Dependents</label>
                        <input 
                            name="dependents" 
                            className="form-input" 
                            placeholder="Number of Dependents" 
                            onChange={handleChange} 
                        />
                        <label className="form-label">Preferred Savings Ratio</label>
                        <input 
                            name="savingsRatio" 
                            className="form-input" 
                            placeholder="Preferred Savings Ratio" 
                            onChange={handleChange} 
                        />
                        <button type="submit" className="form-button">Generate Savings Plan</button>
                    </form>
                </div>
                <div className="plan-section">
                    <textarea 
                        value={savingsPlan} 
                        readOnly 
                        className="form-textarea" 
                        placeholder="Generated Savings Plan will appear here"
                        rows="10"
                        cols="50"
                    />
                </div>
            </div>
        </div>
    );
}

export default CustomerData;
