import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import './BarChart.css'

// Import necessary Chart.js components
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Colors
} from 'chart.js';

ChartJs.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function BarChart() {
    const [data, setData] = useState(null);

    useEffect(() => {
        // Fetch data from backend when component mounts
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // Fetch data from backend API
            const response = await fetch('http://localhost:3000/api/v1/getexpenses'); // Adjust the endpoint to match your backend route
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const responseData = await response.json();

            // Aggregate data by date and calculate total expense for each date
            const aggregatedData = aggregateDataByDate(responseData.allexpenses);

            // Prepare data for chart
            const chartData = {
                labels: Object.keys(aggregatedData),
                
                datasets: [
                    {
                        label: "Expenses",
                        data: Object.values(aggregatedData),
                        backgroundColor: "rgba(255, 99, 132, 0.2)",
                        borderColor: "rgba(255, 99, 132, 1)",
                        borderWidth: 1,
                    },
                ],
            };

            setData(chartData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Function to aggregate data by date and calculate total expense for each date
    const aggregateDataByDate = (expenses) => {
        const aggregatedData = {};
        expenses.forEach((expense) => {
            const date = expense.Date.split('T')[0];
            if (aggregatedData[date]) {
                aggregatedData[date] += expense.expense;
            } else {
                aggregatedData[date] = expense.expense;
            }
        });
        return aggregatedData;
    };

    const options = {
        Colors:'black',
    };

    return (
        <div className='bar' style={{height:'240px', width:'460px', border:'2px solid white', padding:'0.5rem'}}>
            {data ? (
                <Bar options={options} data={data} style={{height:'100%', width:'100%'}} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
