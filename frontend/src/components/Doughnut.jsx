import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
ChartJS.register(ArcElement, Tooltip);

function Doughnutchart() {
  const [categoryPercentages, setCategoryPercentages] = useState({
    Entertainment: 0,
    Essentials: 0,
    FoodandClothing: 0,
    Miscellaneous: 0,
  });

  // Fetch expenses data from backend and calculate category percentages
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/v1/getexpenses');
        const resp = await res.json();
        const expenses = resp.allexpenses;

        if (expenses.length === 0) {
          // If no expenses, set the default value for "No Expenses" category to 100%
          setCategoryPercentages({ "No Expenses": 100 });
          return;
        }

        // Calculate total expense and category totals
        let totalExpense = 0;
        const categoryTotals = {
          Entertainment: 0,
          Essentials: 0,
          FoodandClothing: 0,
          Miscellaneous: 0,
        };
        expenses.forEach(expense => {
          totalExpense += expense.expense;
          categoryTotals[expense.category] += expense.expense;
        });

        // Calculate category percentages
        const categoryPercentages = {};
        Object.keys(categoryTotals).forEach(category => {
          categoryPercentages[category] = (categoryTotals[category] / totalExpense) * 100;
        });

        setCategoryPercentages(categoryPercentages);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: ['Entertainment', 'Essentials', 'Food and Clothing', 'Miscellaneous', 'No Expenses'],
    datasets: [
      {
        data: [
          categoryPercentages.Entertainment,
          categoryPercentages.Essentials,
          categoryPercentages.FoodandClothing,
          categoryPercentages.Miscellaneous,
          categoryPercentages["No Expenses"]
        ],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#5cb85c'], // Green color for "No Expenses"
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#5cb85c'],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'right',
        align: 'center',
        reverse: true, 
        labels: {
          boxWidth: 20,
          padding: 20, 
        }
      }
    }
  };

  return <Doughnut data={data} options={options} />;
}

export default Doughnutchart;
