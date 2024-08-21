import React, { useContext, useState, useEffect } from "react";
import './Navbar.css';
import { useNavigate } from "react-router-dom";
import { Context } from "./Context";
import { FaUser } from "react-icons/fa6";


export default function Navbar(){

    

    const{logged,nameUser,setUserToken,handleLogged, handleLoggedOut}=useContext(Context)
    const[logoClicked,setLogoClicked]=useState(false)
    const[classnameH,setH]=useState('featurebtns')
    const[classnameL,setL]=useState('featurebtns')
    const[classnameB,setB]=useState('featurebtns B')
    const[classnameI,setI]=useState('featurebtns I')
    const[classnameA,setA]=useState('featurebtns A')

    useEffect(()=>{
        const token=localStorage.getItem('authToken')
        const email=localStorage.getItem('userEmail')
        console.log(token)
        console.log(email)
        if(token){
            handleLogged(email, token)
        }
    },[])

    console.log(logged)


    function logoClickHandler(){
        setLogoClicked(!logoClicked)
    }

    
    const Navi=useNavigate()
    function logoutHandler(){
        handleLoggedOut();
        setUserToken(null);
        localStorage.removeItem('authToken');
        Navi('/login')
    }
    
    const homeHandler=()=>{
        setH('featurebtnsselected')
        Navi('/')
    }
    const learnHandler=()=>{
        setL('featurebtnsselected')
        Navi('/learn')
    }
    const expenseHandler=()=>{
        setB("featurebtnsselected B")
        Navi('/expensetracker')
    }
    const investHandler=()=>{
        setI("featurebtnsselected I")
        Navi('/invest')
    }
    const aboutHandler=()=>{
        setA('featurebtnsselected A')
        Navi('/about')
    }
    const signupHandler=()=>{
        Navi('/signup')      
    }
    const loginHandler=()=>{
        Navi('/login')
    }
    return(
        <div className="navbar">
            <div className="logo">
                <img className="logoimage" src="https://img.freepik.com/premium-vector/financial-chart-logo-design-template-vector-simple-illustration-logo-financial-company_698214-33.jpg" alt="" />
            </div>
            <div className="features">
                <button className={classnameH} onClick={homeHandler}>Home</button>
                <button className={classnameL} onClick={learnHandler}>Learn</button>
                <button className={classnameB}  onClick={expenseHandler }>Budgeting tool</button>
                <button className={classnameI} onClick={investHandler}>Investment</button>
                <button className={classnameA} onClick={aboutHandler}>About us</button>
            </div>
            
            <div className={logged?"loggeduser":"useraccount"}>
               {logged ?
               <>
               <p className="welcome">Welcome {nameUser}</p>
               <div onClick={logoClickHandler} className="userlogo" style={{boxShadow:"0px 0px 2px 3px #1f6f78",backgroundColor:'#dfd3c3', color:'white', display:'flex', justifyContent:'center', alignItems:'center', padding:'1rem', borderRadius:'50%'}}>
               <FaUser></FaUser>
               </div>
               </>
                :
                <> <button className="useraccbtns" onClick={signupHandler}>Sign Up</button>
                <button className="useraccbtns" onClick={loginHandler}>Login</button> </>
                }
            </div>
            {logoClicked?
            <div className="logoutbtns">
                <button className="logooubuttons" onClick={logoutHandler}>Logout</button>
                <button className="logooubuttons">Settings</button>
            </div>
            :
            <div className="logoutbtns2">
            <button className="logooubuttons" onClick={logoutHandler}>Logout</button>
            <button className="logooubuttons">Settings</button>
        </div>}

        </div>
    )
}