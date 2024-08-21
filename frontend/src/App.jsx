import React from "react";
import './App.css'
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";

export default function App(){
  
  return(
    <div className="mainapp">
      <div className="sb">
        <SideBar />
      </div>
      <div className="app">
        <div className="nav">
          <Navbar></Navbar>
        </div>
        <div className="indeximage">
          
          <img className="financeimage" src="https:www.greenvillefederal.com/wp-content/uploads/2021/03/MoneyMatters.jpg" alt="" />
        </div>

        <div className="content1">
          <div className="savimage">
          <div className="imgshadow">
            <img className="savingsimage1" src="https:png.pngtree.com/thumb_back/fw800/background/20230928/pngtree-financial-planning-gold-coins-and-piggy-bank-in-3d-rendering-saving-image_13510428.png" alt="" /></div>
          </div>
          <div className="savingscontent">
            <h1 style={{margin:'0', color:'#394a51'}}>The art is not in making money, but in saving it.</h1>
            <p style={{fontSize:'22px', wordSpacing:'5px', color:'gray'}}>Our Savings Tracker is designed to help you stay organized, motivated, and on track towards achieving your savings targets.</p>
            <div className="savebtndiv">
              <button className="savebtn">Save Now</button>
            </div>
          </div>
        </div>

        <div className="content2"> 
          <div className="savingscontent">
            <h1 style={{margin:'0', color:'#394a51'}}>Learn investing today, thrive tomorrow.</h1>
            <p style={{fontSize:'22px', wordSpacing:'5px', color:'gray'}}>With user-friendly interfaces and personalized learning paths learn investing. Join our community of learners today and start building the skills and knowledge you need to shape your financial future.</p>
            <div className="savebtndiv">
              <button className="savebtn">Learn Investing</button>
            </div>
          </div>
          <div className="savimage">
          <div className="imgshadow"><img className="savingsimage2" src="https:img.freepik.com/premium-photo/financial-investment-stack-coins-finance-investor-with-trading-graph-growth-banking_34200-487.jpg" alt="" /></div>
          </div>
        </div>

        <div className="content3">
          <div className="savimage">
          <div className="imgshadow">
            <img className="savingsimage1" src="https:png.pngtree.com/thumb_back/fw800/background/20230928/pngtree-financial-planning-gold-coins-and-piggy-bank-in-3d-rendering-saving-image_13510428.png" alt="" /></div>
          </div>
          <div className="savingscontent">
            <h1 style={{margin:'0', color:'#394a51'}}>The art is not in making money, but in saving it.</h1>
            <p style={{fontSize:'22px', wordSpacing:'5px', color:'gray'}}>Our Savings Tracker is designed to help you stay organized, motivated, and on track towards achieving your savings targets.</p>
            <div className="savebtndiv">
              <button className="savebtn">Save Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
     
  )
}