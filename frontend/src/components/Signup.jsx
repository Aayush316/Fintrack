import React, { useState } from "react";
import './Signup.css'
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Signup(){

    const[userData, setUserData]=useState({firstName:'',lastName:'',email:'',setpassword:'', confirmpassword:''})
    const Navi=useNavigate()

    function changeHandler(e){
        const{name,value}=e.target
        setUserData(prevState=>({
            ...prevState,
            [name]:value
        }))
    }

    async function newUserHandler(e){
        e.preventDefault();
        fetch("http://localhost:3000/api/v1/createaccount",{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
        .then((res)=>{
            console.log(res)
            if(res.ok===true){
                Navi('/login')
                toast.success("Account created successfully")
            }
            else{
                toast.error('Use already exists')
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    return(
        <div className="signup">
            <div className="desc">
                <div className="content">
                    <div style={{width:'100%'}}>
                        <p style={{marginBottom:'1rem', fontSize:'30px', fontWeight:'400'}}>Sign up right now!</p>
                        <hr style={{width:'100%', borderColor:'#ececec'}}></hr>
                    </div>
                    <div style={{display:'flex', flexDirection:'column', gap:'40px'}}>
                        <p>Sign Up Now to unlock a world of financial knowledge and opportunities.Signing up is quick, easy, and completely free. Join us today and embark on your journey towards financial empowerment!</p>
                        <button className="learnbtn">Learn More</button>
                    </div>
                </div>
            </div>
            <div className="signupdetails">
                <form className="signupform">
                    <div className="title">
                        <div>
                            <FaUser style={{fontSize:'80px', color:'white', marginBottom:'0.3rem'}}/>
                        </div>
                        <h1 style={{marginBottom:'1rem'}}>Sign Up!</h1>
                        <div style={{width:'100%', height:'0.2em', backgroundColor:'#ececec'}}></div>
                    </div>
                    <div className="userdetails">
                        <div style={{display:'flex', flexDirection:'column', gap:'5px', width:'50%'}}>
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" id="firstName" name='firstName' className="firstName" onChange={changeHandler}/>
                        </div>
                        <div style={{display:'flex', flexDirection:'column', gap:'5px', width:'50%'}}>
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" id="lastName" name="lastName" className="lastName" onChange={changeHandler}/>
                        </div>    
                    </div>
                    <div className="useremail">
                        <label htmlFor="emailadd">Email Address</label>
                        <input type="email" name="email" id="emailadd" className="emailadd" onChange={changeHandler}/>
                    </div>
                    <div className="passdetails" style={{display:'flex', flexDirection:'row', gap:'70px'}}>
                        <div style={{display:'flex', flexDirection:'column', gap:'5px', width:'50%'}}>
                            <label htmlFor="setpass">Set Password</label>
                            <input type="password" name="confirmpassword" id="setpass" className="setpass" onChange={changeHandler}/>
                        </div>    
                        <div style={{display:'flex', flexDirection:'column', gap:'5px', width:'50%'}}>
                            <label htmlFor="confirmpass">Confirm Password</label>
                            <input type="password" name="setpassword" id="confirmpass" className="confirmpass" onChange={changeHandler}/>
                        </div>    
                    </div>
                    <div className="signupbtn">
                        <button className="signupbutton" onClick={newUserHandler}>Sign Up</button>
                        <Link to='/login'><a href="" style={{textDecoration:'none'}}><p style={{marginLeft:'0.3rem', color:'navy', textDecoration:'none'}}>Already have account?</p></a></Link>
                        {/* <div style={{marginLeft:'0.3rem', width:'40%', height:'0.1em', backgroundColor:'#ececec'}}></div> */}
                    </div>
                </form>
            </div>
        </div>
    )
}