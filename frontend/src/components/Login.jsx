import React, { useContext } from "react";
import { FaUser } from "react-icons/fa6";
import './Login.css'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { Context } from "./Context";




export default function Login(){

    const{logged,handleLogged}=useContext(Context)

    const Navi=useNavigate()

    const[loginDetails,setLoginDetails]=useState({email:'',password:''})

    function changeHandler(e){
        const{name,value}=e.target
        setLoginDetails(prevData=>({
            ...prevData,
            [name]:value
        }))
    }


    async function loginHandler(e){
        e.preventDefault()
        fetch("http://localhost:3000/api/v1/loginaccount",{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginDetails),
        })
        .then(async (res)=>{
            let resData = await res.json()
            console.log(resData)
            if(res.ok===true){
                Navi('/')
                toast.success("Logged In Successfully")
                console.log(logged)
                handleLogged(loginDetails.email, resData.token)
                console.log(logged)
            }
            else{
                toast.error("Invalid Username or Password")
            }
        })
        .catch((error)=>{
            console.log("error")
            console,log(error)
        })
    }

    function signupHandler(){
        Navi('/signup')
    }

    return(
        <div className="login">
            <div className="desc">
                <div className="content">
                    <div style={{width:'100%'}}>
                        <p style={{marginBottom:'1rem', fontSize:'30px', fontWeight:'400'}}>Log In right now!</p>
                        <hr style={{width:'100%', borderColor:'#ececec'}}></hr>
                    </div>
                    <div style={{display:'flex', flexDirection:'column', gap:'40px'}}>
                        <p>Welcome back to Finance Literacy! Log in to access your account and unlock a world of personalized financial insights and tools tailored to your needs.</p>
                        <button className="learnbtn">Learn More</button>
                    </div>
                    <div style={{display:'flex', width:'100%', marginTop:'1rem', flexDirection:'column', gap:'10px'}}>
                        <p>Dont have an account? Create One!</p>
                        <button className="learnbtn" onClick={signupHandler}>Sign Up</button>
                    </div>
                </div>
            </div>
            <div className="logindetails">
                <form className="loginform">
                    <div className="title">
                        <div>
                            <FaUser style={{fontSize:'80px', color:'white', marginBottom:'0.3rem'}}/>
                        </div>
                        <h1 style={{marginBottom:'1rem'}}>Log In!</h1>
                        <div style={{width:'100%', height:'0.2em', backgroundColor:'#ececec'}}></div>
                    </div>
                    
                    <div className="useremail">
                        <label htmlFor="emailadd">Email Address</label>
                        <input type="email" name="email" id="emailadd" className="emailadd" onChange={changeHandler}/>
                    </div>
                    <div className="passdetails">
                        <label htmlFor="confirmpass">Password</label>
                        <input type="password" name="password" id="confirmpass" className="confirmpass" onChange={changeHandler}/>  
                    </div>
                    <div className="loginbtn">
                        <button className="loginbutton" onClick={loginHandler}>Log In</button>
                        <div style={{width:'100%', height:'0.2em', backgroundColor:'#ececec'}}></div>
                        <button className="googlesignin">Sign in with Google</button>
                    </div>
                </form>
            </div>
        </div>
    )
}