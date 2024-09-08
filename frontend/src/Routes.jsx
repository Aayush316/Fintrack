import React from "react";
import {Routes, Route} from 'react-router-dom'
import Investment from "./components/Investment";
import App from "./App";
import Expensetracker from "./components/Expensetracker";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Learn from "./components/Learn";
import Cart from "./components/Cart";
import CustomerData from "./components/CustomerData";

export default function Routing(){
    return(
        <Routes>
            <Route path="/" element={<App></App>}></Route>
            <Route path="/learn" element={<Learn></Learn>}></Route>
            <Route path="/invest" element={<Investment></Investment>}></Route>
            <Route path="/expensetracker" element={<Expensetracker />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/aiassistant" element={<CustomerData />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
        </Routes>
    )
} 