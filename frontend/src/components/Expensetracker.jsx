import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Navbar from './Navbar';
import './Expensetracker.css';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Avatar } from '@mui/material';
import { Context } from "./Context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { LineChart } from '@mui/x-charts/LineChart';

export default function Expensetracker() {

    const Navi=useNavigate()

    const {userEmail, handleLoggedOut,logged}=useContext(Context)

    const [expenseForm, setExpenseForm]=useState(false)
    const [optionList, setOptionList]=useState(false)
    const [selectedOption, setSelectedOption]=useState("Select Category")
    const [expenseInfo, setExpenseInfo]=useState({product:"", category:"", expense:0, budget:4111})
    const [userExpenseData,setUserExpenseData]=useState([])
    const [budget, setBudget]=useState(0)
    const [usedBudget, setUsedBudget]=useState(0)
    const [spent, setSpent]=useState(0)

    useEffect(()=>{
        const token=localStorage.getItem('authToken')
        const email=localStorage.getItem('userEmail')
        fetchUserExpenseData(email)
        
        if(token && email){
            verifyToken(token, email)
        }
    },[])

    async function verifyToken(token, email){
        fetch("http://localhost:3000/api/v1/verifytoken",{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email,token}),
        })
        .then(async (res)=>{
            if(res.ok===true){
                console.log("Done")
                Navi('/expensetracker')
            }
            else{
                handleLoggedOut()
                Navi("/login")
                toast.error("You have been logged out! Session expired!")
            }
        })
        .catch((error)=>{
            console.log("error expensetracker reload")
            console.log(error)
        })
    }


    async function fetchUserExpenseData(userEmail){
        try{
            const token=localStorage.getItem('authToken')
            if(userEmail && token){
                const data = await fetch(`http://localhost:3000/api/v1/getexpenses/${userEmail}`)
                const jsonData=await data.json()
                // setUserExpenseData(jsonData)
                // console.log(jsonData)
                setUserExpenseData(jsonData.allexpenses)
                
                setBudget(jsonData.allexpenses[0].budget)
                calculateUsed(jsonData.allexpenses)
            }
        }
        catch{
            console.log("Error Fetching Data")
        }
    }

    const calculateUsed=(data)=>{
        let used=0;
        data.map(exp=>{
            used=used+exp.expense
        })
        setSpent(used)
        used=(used/data[0].budget)*100
        used=used.toFixed(2)
        setUsedBudget(used)
    }

    async function expenseDataHandler(e){
        console.log(expenseInfo)
        expenseInfo.email=userEmail
        if(!logged){
            toast.error("Please Login to access this feature")
            Navi('/login')
        }
        fetch('http://localhost:3000/api/v1/newexpense', {
            method:'POST',
            headers:{
                'Content-Type':'application/json' 
            },
            body: JSON.stringify(expenseInfo) 
        })
        .then(data=>{
            if(data.ok==true){
                console.log('Success:', data);
                setExpenseForm(false);
                setExpenseInfo({email:userEmail, product: "", category: "", expense: 0, budget:4111 });
                
                fetchUserExpenseData(userEmail,)
            }
            else{
                toast.error("Error adding new expense")
            }

        })
        .catch(error=>{
            console.error('Error:', error);
        });
    };

    const expenseDataChangeHandler=(e)=>{
        let {name,value}=e.target

        setExpenseInfo((prev)=>({
            ...prev,
            [name]:value
        }))
    }

    const formCloseHandler=()=>{
        setExpenseForm(false)
    }

    const NewExpenseHandler=()=>{
        setExpenseForm(true)
    }

    const dropdownOptionsHandler=()=>{
        setOptionList(!optionList)
    }

    const categoryHandler=(e)=>{
        console.log(e)
        let{innerText,id}=e.target
        setSelectedOption(innerText)
        setExpenseInfo((prev)=>({
            ...prev,
            [id]:innerText
        }))
        setOptionList(false)
    }

    //Graph Data
    console.log(userExpenseData)
    const aggregateData = (data) => {
        const result = {};
        
        data.forEach(({ Date, expense }) => {
            const date = Date.split("T")[0];
            if (!result[date]) {
                result[date] = 0;
            }
            result[date] += expense;
            
        });
    
        return Object.keys(result).map(date => ({
            date,
            expense: result[date]
        }));
    };

    const graphData = aggregateData(userExpenseData);
    console.log(graphData);

    const valueFormatter = (value) => `${value} Rs.`;

    //graph data complete

    //linechart data
    const aggreline = (data) => {
        const categories = ['Entertainment', 'Food', 'Clothing', 'Miscellaneous'];
        const result = {};
    
        data.forEach(({ Date, category, expense }) => {
            const [year, month] = Date.split('-').slice(0, 2);
            const key = `${year}-${month}`;
    
            if (!result[key]) {
                result[key] = { Date: key };
                categories.forEach(cat => result[key][cat] = 0);
            }
    
            if (categories.includes(category)) {
                result[key][category] += expense;
            }
        });
    
        const formattedResult = Object.values(result);
        
        // Sort the result by Date (which is in 'YYYY-MM' format)
        formattedResult.sort((a, b) => {
            const dateA = a.Date;
            const dateB = b.Date;
            return dateA.localeCompare(dateB);  // Sorting as strings works because of the 'YYYY-MM' format
        });
    
        console.log("Formatted and Sorted Result", formattedResult);
        return formattedResult;
    };
    
    const lineData = aggreline(userExpenseData);
    console.log("LineData",lineData);

    //PiechartData
    const aggre=(data)=>{
        const result={}
        let total=0;
        data.forEach(({category, expense})=>{
            if(!result[category]){
                result[category]=0
            }
            result[category]+=expense
            total=total+expense;
        })
        console.log("Budeget",budget)
        console.log("Total",total)
        if(budget>total){
            result['Remain']=budget-total
        }
        else{
            result['Remain']=0
        }
        
        return Object.keys(result).map((categor,id)=>({
            id,
            value:result[categor],
            label:categor
        }))
    }
    const piechartData=aggre(userExpenseData)
    console.log(piechartData)
    //piechart data end

    //Table data
    const tableData=userExpenseData

    return (
        <>
        <div className="nav">
            <Navbar />
        </div>
        <div className="budgetingtool">
            <div className="dashboard">
                <div className="expensedetails">
                    <div className="monthlybudget boxes">
                        <div className="amountHeader">
                            <h2>Monthly Budget</h2>
                        </div>
                        <div className="amount">
                            <div className="symbol">
                                <CurrencyRupeeIcon></CurrencyRupeeIcon>
                            </div>
                            <div className="figure">
                                <h2>{budget}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="amountspent boxes">
                        <div className="amountHeader">
                            <h2>Amount Spent</h2>
                        </div>
                        <div className="amount">
                            <div className="symbol">
                                <CurrencyRupeeIcon></CurrencyRupeeIcon>
                            </div>
                            <div className="figure">
                                <h2>{spent}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="balance boxes">
                        <div className="amountHeader">
                            <h2>Balance</h2>
                        </div>
                        <div className="amount">
                            <div className="symbol">
                                <CurrencyRupeeIcon></CurrencyRupeeIcon>
                            </div>
                            <div className="figure">
                                <h2>{budget-spent}</h2>
                            </div>
                        </div>
                    </div>
                </div>

                    <div className="piegau">
                        <div className="chartboxes">
                            <PieChart
                                series={[
                                    {
                                        data: piechartData,
                                        innerRadius: 40,
                                        outerRadius: 100,
                                        paddingAngle: 4,
                                        cornerRadius: 2,
                                        startAngle: -90,
                                        endAngle: 360,
                                        cx: 100,
                                        cy: 120,
                                        
                                    }
                                ]}
                                slotProps={{
                                    legend: {
                                      direction: 'column',
                                      position: { vertical: 'middle', horizontal: 'right' },
                                      padding: 0,
                                    },
                                  }}
                                width={370}
                                height={250}
                                
                            />
                        </div>
                        <div className="chartboxes">
                            <Gauge
                                value={usedBudget}
                                startAngle={0}
                                endAngle={360}
                                innerRadius="80%"
                                outerRadius="100%"
                                height={250}
                                width={250}
                                margin={{ bottom: 0, left: 0, right: 0, top: 0 }}
                                sx={(theme) => ({
                                    [`& .${gaugeClasses.valueText}`]: {
                                    fontSize: 40,
                                    },
                                    [`& .${gaugeClasses.valueArc}`]: {
                                    fill: '#2b9daa',
                                    },
                                    [`& .${gaugeClasses.referenceArc}`]: {
                                    fill: 'rgba(255, 255, 255)',
                                    },
                                })}
                            />
                        </div>    
                    </div>
                    <div className="graphrep">
                        <div className="barGraph">
                            <BarChart
                                dataset={graphData}
                                xAxis={[{ scaleType: 'band', dataKey: 'date'}]}
                                series={[{ dataKey: 'expense', label: 'Expense', valueFormatter }]}
                                // layout="vertical"
                                yAxis= {[
                                    {
                                        label: 'Expense (Rs.)',
                                    },
                                ]}
                                width={795}
                                height={400}
                            />
                        </div>
                        <div className="lineGraph">
                        <LineChart
                            dataset={lineData}  // Ensure lineData contains string dates or other categorical strings
                            xAxis={[
                                {
                                    dataKey: 'Date',           // The key from your dataset
                                    scaleType: 'band',         // Use 'band' to handle string values
                                    label: 'Month',            // Optional: Label for the x-axis
                                    tickFontSize: 12,          // Optional: Font size for the ticks
                                    tickLabelPlacement: 'middle', // Optional: Position the tick labels
                                    tickSize: 10,              // Optional: Size of the ticks
                                    valueFormatter: (value) => value.toString(), // Optional: Formatter for the axis values
                                }
                            ]}
                            series={[
                                { dataKey: 'Entertainment', label: 'Entertainment', stroke: '#ff0000' },
                                { dataKey: 'Food', label: 'Food', stroke: '#00ff00' },
                                { dataKey: 'Clothing', label: 'Clothing', stroke: '#0000ff' },
                                { dataKey: 'Miscellaneous', label: 'Miscellaneous', stroke: '#ff00ff' },
                            ]}
                            width={795}
                            height={400}
                            margin={{ top: 20, bottom: 50 }}
                        />

                        </div>
                    </div>



                <div className="table">
                        <div className="tableheader">
                            <h2>Your Expenditure!</h2>
                            <div className="tableEditor">
                                <button className="Ad tableEditorButtons" onClick={NewExpenseHandler}>Add Expense</button>
                                <button className="Re tableEditorButtons">Remove Expense</button>
                            </div>
                        </div>
                        <table className="tab">
                            <thead>
                                <tr>
                                    <th>Sr No.</th>
                                    <th>Product</th>
                                    <th>Category</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tableData.map((row,index)=>
                                            <tr>
                                                <td>{index+1}</td>
                                                <td>{row.product}</td>
                                                <td>{row.category}</td>
                                                <td>{row.expense}</td>
                                                <td>{row.Date.split('T')[0]}</td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    
            </div>
            {expenseForm?
            <div className="expenseformback">
                <div className="expenseForm">
                    <div className="expenseFormHeader">
                        <h1>New Expense</h1>
                       <Avatar className="closeBtn" sx={{backgroundColor:'inherit'}} onClick={formCloseHandler}><HighlightOffIcon fontSize="large" sx={{color:'red', borderRadius:'50%'}}/></Avatar>
                    </div>
                    <div className="productName">
                        <h2>Product Name:</h2>
                        <br />
                        <input className="formInput" name="product" onChange={expenseDataChangeHandler} type="text" style={{width:'100%', boxSizing:'border-box', paddingLeft:'0.5rem', paddingTop:'0.5rem', paddingBottom:'0.5rem', color:'white', border:'none', outline:'1px solid rgba(255, 255, 255, 0.458)'}}/>
                    </div>
                    <div className="categorySelection">
                        <h2>Category</h2>
                        <br />
                        <div className="optionsLabel" onClick={dropdownOptionsHandler} tabIndex='0'>
                            <h3>{selectedOption}</h3>
                            {optionList ?
                                <ArrowDropUpIcon fontSize="large"/>:
                                <ArrowDropDownIcon fontSize="large"/>
                            }
                        </div>
                        {optionList?
                        <div className="catOptions">
                            <ul>
                                <li onClick={categoryHandler} id='category'>Entertainment</li>
                                <li onClick={categoryHandler} id='category'>Clothing</li>
                                <li onClick={categoryHandler} id='category'>Food</li>
                                <li onClick={categoryHandler} id='category'>Miscellaneous</li>
                            </ul>
                        </div>:
                        <></>
                        }
                    </div>
                    <div className="amount">
                        <h2>Amount</h2>
                        <br />
                        <input className="formInput" name="expense" onChange={expenseDataChangeHandler} type="text" style={{width:'100%', boxSizing:'border-box', paddingLeft:'0.5rem', paddingTop:'0.5rem', paddingBottom:'0.5rem', color:'white', border:'none', outline:'1px solid rgba(255, 255, 255, 0.458)'}}/>
                    </div>
                    <button className="newExpense" onClick={expenseDataHandler}>Add New Expense</button>
                </div>
            </div> 
            : <></> 
            }
        </div>
    </>
    );
}
