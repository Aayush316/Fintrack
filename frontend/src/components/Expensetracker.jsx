// import React, { useContext, useEffect } from "react";
// import { useState } from "react";
// import Navbar from './Navbar';
// import './Expensetracker.css';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
// import HighlightOffIcon from '@mui/icons-material/HighlightOff';
// import { Avatar } from '@mui/material';
// import { Context } from "./Context";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
// import {Text, RadialBarChart, RadialBar, PieChart, Pie, BarChart, Bar, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

// export default function Expensetracker() {

    
//     const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF', '#FF6F61'];
    
//     const Navi=useNavigate()
    
//     const {userEmail, handleLoggedOut,logged}=useContext(Context)

//     const [expenseForm, setExpenseForm]=useState(false)
//     const [optionList, setOptionList]=useState(false)
//     const [selectedOption, setSelectedOption]=useState("Select Category")
//     const [expenseInfo, setExpenseInfo]=useState({product:"", category:"", expense:0, budget:4111})
//     const [userExpenseData,setUserExpenseData]=useState([])
//     const [budget, setBudget]=useState(0)
//     const [usedBudget, setUsedBudget]=useState(0)
//     const [spent, setSpent]=useState(0)
//     const gaugeData = [
//         { name: 'Used', value: usedBudget, fill: '#2b9daa' },
//         { name: 'Remaining', value: 100, fill: 'white' },
//     ];
    

//     useEffect(()=>{
//         const token=localStorage.getItem('authToken')
//         const email=localStorage.getItem('userEmail')
//         fetchUserExpenseData(email)
        
//         if(token && email){
//             verifyToken(token, email)
//         }
//     },[])

//     async function verifyToken(token, email){
//         fetch("http://localhost:3000/api/v1/verifytoken",{
//             method:'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({email,token}),
//         })
//         .then(async (res)=>{
//             if(res.ok===true){
//                 console.log("Done")
//                 Navi('/expensetracker')
//             }
//             else{
//                 handleLoggedOut()
//                 Navi("/login")
//                 toast.error("You have been logged out! Session expired!")
//             }
//         })
//         .catch((error)=>{
//             console.log("error expensetracker reload")
//             console.log(error)
//         })
//     }


//     async function fetchUserExpenseData(userEmail){
//         try{
//             const token=localStorage.getItem('authToken')
//             if(userEmail && token){
//                 const data = await fetch(`http://localhost:3000/api/v1/getexpenses/${userEmail}`)
//                 const jsonData=await data.json()
//                 // setUserExpenseData(jsonData)
//                 // console.log(jsonData)
//                 setUserExpenseData(jsonData.allexpenses)
                
//                 setBudget(jsonData.allexpenses[0].budget)
//                 calculateUsed(jsonData.allexpenses)
//             }
//         }
//         catch{
//             console.log("Error Fetching Data")
//         }
//     }

//     const calculateUsed=(data)=>{
//         let used=0;
//         data.map(exp=>{
//             used=used+exp.expense
//         })
//         setSpent(used)
//         used=(used/data[0].budget)*100
//         used=used.toFixed(2)
//         setUsedBudget(used)
//     }

//     async function expenseDataHandler(e){
//         console.log(expenseInfo)
//         expenseInfo.email=userEmail
//         if(!logged){
//             toast.error("Please Login to access this feature")
//             Navi('/login')
//         }
//         fetch('http://localhost:3000/api/v1/newexpense', {
//             method:'POST',
//             headers:{
//                 'Content-Type':'application/json' 
//             },
//             body: JSON.stringify(expenseInfo) 
//         })
//         .then(data=>{
//             if(data.ok==true){
//                 console.log('Success:', data);
//                 setExpenseForm(false);
//                 setExpenseInfo({email:userEmail, product: "", category: "", expense: 0, budget:4111 });
                
//                 fetchUserExpenseData(userEmail,)
//             }
//             else{
//                 toast.error("Error adding new expense")
//             }

//         })
//         .catch(error=>{
//             console.error('Error:', error);
//         });
//     };

//     const expenseDataChangeHandler=(e)=>{
//         let {name,value}=e.target

//         setExpenseInfo((prev)=>({
//             ...prev,
//             [name]:value
//         }))
//     }

//     const formCloseHandler=()=>{
//         setExpenseForm(false)
//     }

//     const NewExpenseHandler=()=>{
//         setExpenseForm(true)
//     }

//     const dropdownOptionsHandler=()=>{
//         setOptionList(!optionList)
//     }

//     const categoryHandler=(e)=>{
//         console.log(e)
//         let{innerText,id}=e.target
//         setSelectedOption(innerText)
//         setExpenseInfo((prev)=>({
//             ...prev,
//             [id]:innerText
//         }))
//         setOptionList(false)
//     }

//     //Graph Data
//     console.log(userExpenseData)
//     const aggregateData = (data) => {
//         const result = {};
        
//         data.forEach(({ Date, expense }) => {
//             const date = Date.split("T")[0];
//             if (!result[date]) {
//                 result[date] = 0;
//             }
//             result[date] += expense;
            
//         });
    
//         return Object.keys(result).map(date => ({
//             date,
//             expense: result[date]
//         }));
//     };

//     const graphData = aggregateData(userExpenseData);
//     console.log(graphData);

//     const valueFormatter = (value) => `${value} Rs.`;

//     //graph data complete

//     //linechart data
//     const aggreline = (data) => {
//         const categories = ['Entertainment', 'Food', 'Clothing', 'Miscellaneous'];
//         const result = {};
    
//         data.forEach(({ Date, category, expense }) => {
//             const [year, month] = Date.split('-').slice(0, 2);
//             const key = `${year}-${month}`;
    
//             if (!result[key]) {
//                 result[key] = { Date: key };
//                 categories.forEach(cat => result[key][cat] = 0);
//             }
    
//             if (categories.includes(category)) {
//                 result[key][category] += expense;
//             }
//         });
    
//         const formattedResult = Object.values(result);
        
//         // Sort the result by Date (which is in 'YYYY-MM' format)
//         formattedResult.sort((a, b) => {
//             const dateA = a.Date;
//             const dateB = b.Date;
//             return dateA.localeCompare(dateB);  // Sorting as strings works because of the 'YYYY-MM' format
//         });
    
//         console.log("Formatted and Sorted Result", formattedResult);
//         return formattedResult;
//     };
    
//     const lineData = aggreline(userExpenseData);
//     console.log("LineData",lineData);

//     //PiechartData
//     const aggre=(data)=>{
//         const result={}
//         let total=0;
//         data.forEach(({category, expense})=>{
//             if(!result[category]){
//                 result[category]=0
//             }
//             result[category]+=expense
//             total=total+expense;
//         })
//         console.log("Budeget",budget)
//         console.log("Total",total)
//         if(budget>total){
//             result['Remain']=budget-total
//         }
//         else{
//             result['Remain']=0
//         }
        
//         return Object.keys(result).map((categor,id)=>({
//             id,
//             value:result[categor],
//             label:categor
//         }))
//     }
//     const piechartData=aggre(userExpenseData)
//     console.log("Piechart", piechartData)
//     //piechart data end

//     //Table data
//     const tableData=userExpenseData

//     return (
//         <div className="mainExpenseTracker">
//             <div>
//                 <Navbar />
//             </div>
//             <div className="dashboard">
//                 <div className="expensedetails">
//                     <div className="boxes">
//                         <div className="amountHeader">
//                             <h2>Monthly Budget</h2>
//                         </div>
//                         <div className="amount">
//                             <div className="symbol">
//                                 <CurrencyRupeeIcon></CurrencyRupeeIcon>
//                             </div>
//                             <div className="figure">
//                                 <h2>{budget}</h2>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="boxes">
//                         <div className="amountHeader">
//                             <h2>Amount Spent</h2>
//                         </div>
//                         <div className="amount">
//                             <div className="symbol">
//                                 <CurrencyRupeeIcon></CurrencyRupeeIcon>
//                             </div>
//                             <div className="figure">
//                                 <h2>{spent}</h2>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="boxes">
//                         <div className="amountHeader">
//                             <h2>Balance</h2>
//                         </div>
//                         <div className="amount">
//                             <div className="symbol">
//                                 <CurrencyRupeeIcon></CurrencyRupeeIcon>
//                             </div>
//                             <div className="figure">
//                                 <h2>{budget-spent}</h2>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                     <div className="piegau">
//                         <div className="chartboxes">
//                             <ResponsiveContainer width="100%" height="100%">
//                                 <PieChart>
//                                 <Pie 
//                                     data={piechartData} 
//                                     dataKey="value" 
//                                     nameKey="label"
//                                     cx="50%" 
//                                     cy="50%" 
//                                     innerRadius="40%" 
//                                     outerRadius="80%" 
//                                     startAngle={-90} 
//                                     endAngle={360} 
//                                     paddingAngle={4} 
//                                     cornerRadius={2} 
//                                 >
//                                     {piechartData.map((_, index) => (
//                                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                                     ))}
//                                 </Pie>
//                                 <Tooltip />
//                                 <Legend layout="horizontal" verticalAlign="top" align="center" />
//                                 </PieChart>
//                             </ResponsiveContainer>
//                         </div>
//                         <div className="chartboxes">
//                             <ResponsiveContainer width="100%" height="100%">
//                                 <RadialBarChart 
//                                 cx="50%" 
//                                 cy="50%" 
//                                 innerRadius="70%" 
//                                 outerRadius="100%" 
//                                 barSize={20} 
//                                 data={gaugeData}
//                                 startAngle={90} 
//                                 endAngle={-270} 
//                                 >
//                                 <RadialBar minAngle={15} background clockWise dataKey="value" />
//                                 <Text 
//                                     x="50%" 
//                                     y="50%" 
//                                     textAnchor="middle" 
//                                     dominantBaseline="middle" 
//                                     fontSize={24} 
//                                     fill="#8884d8"
//                                 >
//                                     {`${gaugeData[0].value}%`}
//                                 </Text>

//                                 <Tooltip 
//                                     formatter={(value) => `${value}%`} 
//                                 />
//                                 <Legend verticalAlign="top" height={36} />
//                                 </RadialBarChart>
//                             </ResponsiveContainer>
//                         </div>   
//                     </div>
//                     <div className="graphrep">
//                         <div className="barGraph">
//                             <ResponsiveContainer width="100%" height="100%">
//                                 <BarChart data={graphData} margin={{left: 20}}>
//                                     <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
//                                     <XAxis dataKey="date" stroke="#9ca3af"/>
//                                     <YAxis stroke="#9ca3af" label={{ value: "Expense (Rs.)", angle: -90, position: "insideLeft", dx: -20, dy: 50 }} />
//                                     <Tooltip 
//                                         contentStyle={{
//                                             backgroundColor: "rgba(31, 41, 55, 0.8)",
//                                             borderColor: "#4B5563"
//                                         }} 
//                                         itemStyle={{
//                                             color: "#E5E7EB"
//                                         }} 
//                                         formatter={(value) => valueFormatter ? valueFormatter(value) : value}
//                                     />
//                                     <Legend 
//                                         layout="horizontal" 
//                                         verticalAlign="top" 
//                                         align="center" 
//                                     />

//                                     <Bar dataKey="expense" fill="cyan" name="Expense" />
//                                 </BarChart>
//                             </ResponsiveContainer>
//                         </div>
//                         <div className="lineGraph">
//                             <ResponsiveContainer width={"100%"} height={"100%"}>
//                                 <LineChart data={lineData} margin={{bottom: 20}}>
//                                     {/* Grid and Axes */}
//                                     <CartesianGrid strokeDasharray="3 3" />
//                                     <XAxis 
//                                         dataKey="Date" 
//                                         label={{ value: "Month", position: "bottom" }} 
//                                         tick={{ fontSize: 12 }} 
//                                     />
//                                     <YAxis />

//                                     {/* Tooltip and Legend */}
//                                     <Tooltip />
//                                     <Legend 
//                                         layout="horizontal" 
//                                         verticalAlign="top" 
//                                         align="center" 
//                                     />

//                                     {/* Lines for different expense categories */}
//                                     <Line type="monotone" dataKey="Entertainment" stroke="#ff0000" name="Entertainment" />
//                                     <Line type="monotone" dataKey="Food" stroke="#00ff00" name="Food" />
//                                     <Line type="monotone" dataKey="Clothing" stroke="#0000ff" name="Clothing" />
//                                     <Line type="monotone" dataKey="Miscellaneous" stroke="#ff00ff" name="Miscellaneous" />
//                                 </LineChart>
//                             </ResponsiveContainer>

//                         </div>
//                     </div>
//                     <div className="table">
//                         <div className="tableheader">
//                             <div className="tableHeading">
//                                 <h2>Your Expenditure!</h2>
//                             </div>
//                             <div className="tableEditor">
//                                 <button className="Ad tableEditorButtons" onClick={NewExpenseHandler}>Add Expense</button>
//                                 <button className="Re tableEditorButtons">Remove Expense</button>
//                             </div>
//                         </div>
//                         <table className="tab">
//                             <thead>
//                                 <tr>
//                                     <th>Sr No.</th>
//                                     <th>Product</th>
//                                     <th>Category</th>
//                                     <th>Amount</th>
//                                     <th>Date</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {
//                                     tableData.map((row,index)=>
//                                             <tr>
//                                                 <td>{index+1}</td>
//                                                 <td>{row.product}</td>
//                                                 <td>{row.category}</td>
//                                                 <td>{row.expense}</td>
//                                                 <td>{row.Date.split('T')[0]}</td>
//                                             </tr>
//                                     )
//                                 }
//                             </tbody>
//                         </table>
//                     </div>    
//                 </div>
//                 {expenseForm ? (
//   <div className="expenseformback">
//     <div className="expenseForm">
//       <div className="expenseFormHeader">
//         <h1>New Expense</h1>
//         <Avatar className="closeBtn" sx={{ backgroundColor: 'inherit' }} onClick={formCloseHandler}>
//           <HighlightOffIcon fontSize="large" sx={{ color: 'red', borderRadius: '50%' }} />
//         </Avatar>
//       </div>
//       <div className="productName">
//         <h2>Product Name:</h2>
//         <input className="formInput" name="product" onChange={expenseDataChangeHandler} type="text" />
//       </div>
//       <div className="categorySelection">
//         <h2>Category</h2>
//         <div className="optionsLabel" onClick={dropdownOptionsHandler} tabIndex="0">
//           <h3>{selectedOption}</h3>
//           {optionList ? <ArrowDropUpIcon fontSize="large" /> : <ArrowDropDownIcon fontSize="large" />}
//         </div>
//         {optionList && (
//           <div className="catOptions">
//             <ul>
//               <li onClick={categoryHandler} id="category">
//                 Entertainment
//               </li>
//               <li onClick={categoryHandler} id="category">
//                 Clothing
//               </li>
//               <li onClick={categoryHandler} id="category">
//                 Food
//               </li>
//               <li onClick={categoryHandler} id="category">
//                 Miscellaneous
//               </li>
//             </ul>
//           </div>
//         )}
//       </div>
//       <div className="expenseAmount">
//         <div className="amountLabel">
//             <h2>Amount</h2>
//         </div>
//         <input className="formInput" name="expense" onChange={expenseDataChangeHandler} type="text" />
//       </div>
//       <button className="newExpense" onClick={expenseDataHandler}>
//         Add New Expense
//       </button>
//     </div>
//   </div>
// ) : (
//   <></>
// )}

//     </div>
//     );
// }

import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Navbar from './Navbar';
import './Expensetracker.css';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Avatar } from '@mui/material';
import { Context } from "./Context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import {Text, RadialBarChart, RadialBar, PieChart, Pie, BarChart, Bar, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function Expensetracker() {

    
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF', '#FF6F61'];
    
    const Navi=useNavigate()
    
    const {userEmail, handleLoggedOut,logged}=useContext(Context)

    const [budgetCatInfo, setBudgetCatInfo]=useState({category:"", budget:0})
    const [budgetCatData, setBudgetCatData] = useState([]);

    const [expenseForm, setExpenseForm]=useState(false)
    const [budgetCategoryForm, setBudgetCategoryForm]=useState(false)
    const [optionList, setOptionList]=useState(false)
    const [selectedOption, setSelectedOption]=useState("Select Category")
    const [expenseInfo, setExpenseInfo]=useState({product:"", category:"", expense:0, budget:4111})
    const [userExpenseData,setUserExpenseData]=useState([])
    const [budget, setBudget]=useState(0)
    const [usedBudget, setUsedBudget]=useState(0)
    const [spent, setSpent]=useState(0)
    const gaugeData = [
        { name: 'Used', value: usedBudget, fill: '#2b9daa' },
        { name: 'Remaining', value: 100, fill: 'white' },
    ];
    
   
    useEffect(()=>{
        const token=localStorage.getItem('authToken')
        const email=localStorage.getItem('userEmail')
        fetchUserExpenseData(email)
        fetchBudgetData(email)
        
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

    const fetchBudgetData = async (userEmail) => {
        try {
            if(userEmail){
                console.log("hi")
                const response = await fetch(`http://localhost:3000/api/v1/budgetCategories/${userEmail}`);
                console.log("hi")
                const jsonData=await response.json()
                console.log(jsonData)
                setBudgetCatData(jsonData);
            }

        } catch (error) {
            console.error("Error fetching budget data:", error);
        }
    };

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

    async function budgetCatHandler(e){
        budgetCatInfo.email=userEmail
        console.log(budgetCatInfo)
            if(!logged){
                toast.error("Please Login to access this feature")
                Navi('/login')
            }
            fetch('http://localhost:3000/api/v1/newbudgetcategory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(budgetCatInfo) // Send the budget category details
            })
            .then(response => response.json())
            .then(data => {
                console.log("Data:-", data)
                if (data.success) {
                    console.log('Budget Category Added:', data);
                    setBudgetCategoryForm(false); // Close the budget form
                    setBudgetCatInfo({ email: userEmail, category: "", budget: 0, date: new Date().toISOString().split('T')[0] });
        
                    // Fetch updated budget categories for the user
                    fetchBudgetData(userEmail);
                }
                else if(data.message=="Budget category already exists"){
                    toast.error("Budget Category already exists")
                }
                else {
                    toast.error("Error adding new budget category");
                }
            })
            .catch(error => {
                console.error('Error:', error);
                toast.error("Server error! Try again later.");
            });

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

    const budgetDataChangeHandler=(e)=>{
        let{name, value}=e.target
        setBudgetCatInfo((prev)=>({
            ...prev,
            [name]:value
        }))
    }

    const expenseDataChangeHandler=(e)=>{
        let {name,value}=e.target

        setExpenseInfo((prev)=>({
            ...prev,
            [name]:value
        }))
    }

    const formCloseHandler=()=>{
        setExpenseForm(false)
        setBudgetCategoryForm(false)
    }

    const NewExpenseHandler=()=>{
        setExpenseForm(true)
    }

    const NewBudgetCategoryHandler=()=>{
        setBudgetCategoryForm(true)
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

    const budgetCategoryHandler=(e)=>{
        console.log(e)
        let{innerText,id}=e.target
        setSelectedOption(innerText)
        setBudgetCatInfo((prev)=>({
            ...prev,
            [id]:innerText
        }))
        setOptionList(false)
    }

    //Graph Data
    // console.log(userExpenseData)
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
    // console.log(graphData);

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
        // console.log("Budeget",budget)
        // console.log("Total",total)
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
    console.log("Piechart", piechartData)
    //piechart data end

    //Table data
    const tableData=userExpenseData
    const budgetTableData=budgetCatData
    
    // Double Graph Data

    const doubleBar = (data) => {
        const result = {};
        
        // Summing up expenses per category
        data.forEach(({ category, expense }) => {
            if (!result[category]) {
                result[category] = 0;
            }
            result[category] += expense;
        });
    
        // Merging with budget data
        return budgetTableData.map(({ category, budget }) => ({
            category,
            budget,
            expense: result[category] || 0  // Default to 0 if no expense data found
        }));
    };

    const doubleBarData=doubleBar(userExpenseData)

    console.log(doubleBarData)

    return (
        <div className="mainExpenseTracker">
            <div>
                <Navbar />
            </div>

            <div className="dashboard">

                <div className="budgetCategories">
                    <div className="budgetCategoryHeader">
                        <h2>Budget Per Category</h2>
                        <div className="budegetCategoryBtns">
                        <button className="newExpense" onClick={NewBudgetCategoryHandler}>
                            Add New Budget
                        </button>
                        </div>
                    </div>
                    <table className="tab">
                        <thead>
                            <tr>
                                <th>Sr No.</th>
                                <th>Category</th>
                                <th>Budget</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                budgetTableData.map((row,index)=>
                                        <tr>
                                            <td>{index+1}</td>
                                            <td>{row.category}</td>
                                            <td>{row.budget}</td>
                                            <td>{row.Date}</td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>

                <div className="expensedetails">
                    <div className="boxes">
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
                    <div className="boxes">
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
                    <div className="boxes">
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
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                <Pie 
                                    data={piechartData} 
                                    dataKey="value" 
                                    nameKey="label"
                                    cx="50%" 
                                    cy="50%" 
                                    innerRadius="40%" 
                                    outerRadius="80%" 
                                    startAngle={-90} 
                                    endAngle={360} 
                                    paddingAngle={4} 
                                    cornerRadius={2} 
                                >
                                    {piechartData.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend layout="horizontal" verticalAlign="top" align="center" />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="chartboxes">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadialBarChart 
                                cx="50%" 
                                cy="50%" 
                                innerRadius="70%" 
                                outerRadius="100%" 
                                barSize={20} 
                                data={gaugeData}
                                startAngle={90} 
                                endAngle={-270} 
                                >
                                <RadialBar minAngle={15} background clockWise dataKey="value" />
                                <Text 
                                    x="50%" 
                                    y="50%" 
                                    textAnchor="middle" 
                                    dominantBaseline="middle" 
                                    fontSize={24} 
                                    fill="#8884d8"
                                >
                                    {`${gaugeData[0].value}%`}
                                </Text>

                                <Tooltip 
                                    formatter={(value) => `${value}%`} 
                                />
                                <Legend verticalAlign="top" height={36} />
                                </RadialBarChart>
                            </ResponsiveContainer>
                        </div>   
                    </div>
                    <div className="graphrep">
                        <div className="barGraph">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={graphData} margin={{left: 20}}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                                    <XAxis dataKey="date" stroke="#9ca3af"/>
                                    <YAxis stroke="#9ca3af" label={{ value: "Expense (Rs.)", angle: -90, position: "insideLeft", dx: -20, dy: 50 }} />
                                    <Tooltip 
                                        contentStyle={{
                                            backgroundColor: "rgba(31, 41, 55, 0.8)",
                                            borderColor: "#4B5563"
                                        }} 
                                        itemStyle={{
                                            color: "#E5E7EB"
                                        }} 
                                        formatter={(value) => valueFormatter ? valueFormatter(value) : value}
                                    />
                                    <Legend 
                                        layout="horizontal" 
                                        verticalAlign="top" 
                                        align="center" 
                                    />

                                    <Bar dataKey="expense" fill="cyan" name="Expense" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="lineGraph">
                            <ResponsiveContainer width={"100%"} height={"100%"}>
                                <LineChart data={lineData} margin={{bottom: 20}}>
                                    {/* Grid and Axes */}
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis 
                                        dataKey="Date" 
                                        label={{ value: "Month", position: "bottom" }} 
                                        tick={{ fontSize: 12 }} 
                                    />
                                    <YAxis />

                                    {/* Tooltip and Legend */}
                                    <Tooltip />
                                    <Legend 
                                        layout="horizontal" 
                                        verticalAlign="top" 
                                        align="center" 
                                    />

                                    {/* Lines for different expense categories */}
                                    <Line type="monotone" dataKey="Entertainment" stroke="#ff0000" name="Entertainment" />
                                    <Line type="monotone" dataKey="Food" stroke="#00ff00" name="Food" />
                                    <Line type="monotone" dataKey="Clothing" stroke="#0000ff" name="Clothing" />
                                    <Line type="monotone" dataKey="Miscellaneous" stroke="#ff00ff" name="Miscellaneous" />
                                </LineChart>
                            </ResponsiveContainer>

                        </div>
                    </div>
                    <div className="table">
                        <div className="tableheader">
                            <div className="tableHeading">
                                <h2>Your Expenditure!</h2>
                            </div>
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
                {expenseForm ? (
  <div className="expenseformback">
    <div className="expenseForm">
      <div className="expenseFormHeader">
        <h1>New Expense</h1>
        <Avatar className="closeBtn" sx={{ backgroundColor: 'inherit' }} onClick={formCloseHandler}>
          <HighlightOffIcon fontSize="large" sx={{ color: 'red', borderRadius: '50%' }} />
        </Avatar>
      </div>
      <div className="productName">
        <h2>Product Name:</h2>
        <input className="formInput" name="product" onChange={expenseDataChangeHandler} type="text" />
      </div>
      <div className="categorySelection">
        <h2>Category</h2>
        <div className="optionsLabel" onClick={dropdownOptionsHandler} tabIndex="0">
          <h3>{selectedOption}</h3>
          {optionList ? <ArrowDropUpIcon fontSize="large" /> : <ArrowDropDownIcon fontSize="large" />}
        </div>
        {optionList && (
          <div className="catOptions">
            <ul>
              <li onClick={categoryHandler} id="category">
                Entertainment
              </li>
              <li onClick={categoryHandler} id="category">
                Clothing
              </li>
              <li onClick={categoryHandler} id="category">
                Food
              </li>
              <li onClick={categoryHandler} id="category">
                Miscellaneous
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="expenseAmount">
        <div className="amountLabel">
            <h2>Amount</h2>
        </div>
        <input className="formInput" name="expense" onChange={expenseDataChangeHandler} type="text" />
      </div>
      <button className="newExpense" onClick={expenseDataHandler}>
        Add New Expense
      </button>
    </div>
  </div>
) : (
  <></>
)}

{budgetCategoryForm ? (
  <div className="expenseformback">
    <div className="expenseForm">
      <div className="expenseFormHeader">
        <h1>New Budget</h1>
        <Avatar className="closeBtn" sx={{ backgroundColor: 'inherit' }} onClick={formCloseHandler}>
          <HighlightOffIcon fontSize="large" sx={{ color: 'red', borderRadius: '50%' }} />
        </Avatar>
      </div>
      <div className="categorySelection">
        <h2>Category</h2>
        <div className="optionsLabel" onClick={dropdownOptionsHandler} tabIndex="0">
          <h3>{selectedOption}</h3>
          {optionList ? <ArrowDropUpIcon fontSize="large" /> : <ArrowDropDownIcon fontSize="large" />}
        </div>
        {optionList && (
          <div className="catOptions">
            <ul>
              <li onClick={budgetCategoryHandler} id="category">
                Entertainment
              </li>
              <li onClick={budgetCategoryHandler} id="category">
                Clothing
              </li>
              <li onClick={budgetCategoryHandler} id="category">
                Food
              </li>
              <li onClick={budgetCategoryHandler} id="category">
                Miscellaneous
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="expenseAmount">
        <div className="amountLabel">
            <h2>Amount</h2>
        </div>
        <input className="formInput" name="budget" onChange={budgetDataChangeHandler} type="text" />
      </div>
      <button className="newExpense" onClick={budgetCatHandler}>
        Add New Budget
      </button>
    </div>
  </div>
) : (
  <></>
)}

    </div>
    );
}
