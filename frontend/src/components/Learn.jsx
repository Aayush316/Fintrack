import React, { useContext, useEffect } from 'react'
import './Learn.css'
import Card from './Card'
import { Context } from './Context';
import Navbar from './Navbar';
import { MdOutlineShoppingCart } from "react-icons/md";
import { BsFillBagHeartFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import GroupsIcon from '@mui/icons-material/Groups';
import SchoolIcon from '@mui/icons-material/School';
import { Avatar } from '@mui/material';

export default function Learn(){

    const{data,handleLogged}=useContext(Context)
    console.log(data)

    const navi=useNavigate();
    const cartHandler=()=>{
        navi('/cart')
    }


    return(
        <>
        <div className="nav">
            <Navbar></Navbar>
        </div>
        <div className="mainlearn">
            <div className="learncontent">
                <h1 style={{ fontFamily:"Anek Devanagari"}}><span style={{color:'rgb(63, 110, 110)'}}>Master Your Financial Future:</span> Enroll in Our Expert-Led Courses Today!</h1>
                <p style={{fontSize:'20px', fontFamily:"Anek Devanagari"}}>Are you ready to take control of your finances and build wealth? At FinGrow, we offer top-tier courses designed to empower you with the knowledge and skills needed to succeed in money management and stock trading.
                </p>
                <div className="learnstats">
                <div style={{display:'flex', alignItems:'center', gap:'1rem'}}>
                        <Avatar sx={{height:'52px', width:'52px', bgcolor:'rgb(63, 110, 110)'}}><MenuBookIcon sx={{color:'white', fontSize:'30px'}}></MenuBookIcon></Avatar>
                        <h3 style={{display:'inline', fontFamily:"Anek Devanagari"}}><span style={{color:'rgb(63, 110, 110)'}}>20,000+</span> Courses to grow Financial Knowledge</h3>
                    </div>
                    <div style={{display:'flex', alignItems:'center', gap:'1rem'}}>
                        <Avatar sx={{height:'52px', width:'52px', bgcolor:'rgb(63, 110, 110)'}}><GroupsIcon sx={{color:'white', fontSize:'30px'}}></GroupsIcon></Avatar>
                        <h3 style={{display:'inline', fontFamily:"Anek Devanagari"}}><span style={{color:'rgb(63, 110, 110)'}}>5,00,000+</span> Active Learners</h3>
                    </div>
                    <div style={{display:'flex', alignItems:'center', gap:'1rem'}}>
                        <Avatar sx={{height:'52px', width:'52px', bgcolor:'rgb(63, 110, 110)'}}><SchoolIcon sx={{color:'white', fontSize:'30px'}}></SchoolIcon></Avatar>
                        <h3 style={{display:'inline', fontFamily:"Anek Devanagari"}}><span style={{color:'rgb(63, 110, 110)'}}>5,000+</span> Top Educators</h3>
                    </div>
                </div>
            </div>
            <div className="learn">
                <h1 style={{ fontFamily:"Anek Devanagari", marginTop:'7.5rem'}}>Explore Top <span style={{color:'rgb(63, 110, 110)'}}>Courses</span></h1>
                <div className="learnNav">
                    <div style={{display:'flex', gap:'20px', width:'60%'}}>
                        <button className='learnNavBtns'>Money Management</button>
                        <button className='learnNavBtns'>Stock Trading</button>
                    </div>
                    <div style={{display:'flex', flexDirection:'row-reverse', width:'100%', gap:'10px'}}>
                        <Avatar variant='rounded' sx={{height:'48px', width:'50px', bgcolor:'rgb(63, 110, 110)'}}><ShoppingCartIcon fontSize='medium'/></Avatar>

                    </div>
                </div>
                <div className="Courses">
                    {data.map((course)=>(
                        <Card course={course}></Card>
                    ))}
                </div>
            </div>
        </div>
        </>
    );
}