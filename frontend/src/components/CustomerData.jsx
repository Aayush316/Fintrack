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
        <>
            <Navbar></Navbar>
            <div className="container">
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <input name="income" placeholder="Monthly Income" onChange={handleChange} />
                        <input name="expenses" placeholder="Monthly Expenses" onChange={handleChange} />
                        <input name="goals" placeholder="Savings Goals" onChange={handleChange} />
                        <input name="currentSavings" placeholder="Current Savings" onChange={handleChange} />
                        <input name="investments" placeholder="Investments" onChange={handleChange} />
                        <input name="debt" placeholder="Debt Information" onChange={handleChange} />
                        <input name="riskProfile" placeholder="Investment Risk Profile" onChange={handleChange} />
                        <input name="age" placeholder="Age" onChange={handleChange} />
                        <input name="dependents" placeholder="Number of Dependents" onChange={handleChange} />
                        <input name="savingsRatio" placeholder="Preferred Savings Ratio" onChange={handleChange} />
                        <button type="submit">Generate Savings Plan</button>
                    </form>
                </div>
                <div className="plan-container">
                    <textarea 
                        value={savingsPlan} 
                        readOnly 
                        placeholder="Generated Savings Plan will appear here"
                        rows="10"
                        cols="50"
                    />
                </div>
            </div>
        </>
    );
}

export default CustomerData;
