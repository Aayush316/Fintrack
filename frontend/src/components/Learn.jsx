import React, { useContext, useEffect } from 'react'
import './Learn.css'
import Card from './Card'
import { Context } from './Context';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
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
        <div className="mainLearn">
            <div>
                <Navbar></Navbar>
            </div>
            <div className="learnContent">
                <div className="tagLine">
                    <h1><span style={{color:'rgb(63, 110, 110)'}}>Master Your Financial Future:</span> Enroll in Our Expert-Led Courses Today!</h1>
                    <p>Are you ready to take control of your finances and build wealth? At FinGrow, we offer top-tier courses designed to empower you with the knowledge and skills needed to succeed in money management and stock trading.
                    </p>
                    <button className="exploreCourses">Explore Courses</button>
                </div>
                <div className="learnStatsWrapper">
                    <div className="learnstats">
                        <div className="statsInfo">
                            <div className='stats'>
                                <Avatar sx={{height:'4vw', width:'4vw', bgcolor:'rgb(63, 110, 110)'}}><MenuBookIcon sx={{color:'white', fontSize:'2.6vw'}}></MenuBookIcon></Avatar>
                                <h3><span style={{color:'rgb(63, 110, 110)'}}>20,000+</span> Courses to grow Financial Knowledge</h3>
                            </div>
                            <div className='stats'>
                                <Avatar sx={{height:'4vw', width:'4vw', bgcolor:'rgb(63, 110, 110)'}}><GroupsIcon sx={{color:'white', fontSize:'2.6vw'}}></GroupsIcon></Avatar>
                                <h3><span style={{color:'rgb(63, 110, 110)'}}>5,00,000+</span> Active Learners</h3>
                            </div>
                            <div className='stats'>
                                <Avatar sx={{height:'4vw', width:'4vw', bgcolor:'rgb(63, 110, 110)'}}><SchoolIcon sx={{color:'white', fontSize:'2.6vw'}}></SchoolIcon></Avatar>
                                <h3><span style={{color:'rgb(63, 110, 110)'}}>5,000+</span> Top Educators</h3>
                            </div>
                        </div>
                        <div className="statsImg">
                            <img className='statsImage' src="https://th.bing.com/th/id/R.ee1c0a5420c57bfd2ea738db2f4c6aa3?rik=UtvUN67jpj0DaA&riu=http%3a%2f%2fwww.pptbackgrounds.org%2fuploads%2fstatistics-stats-backgrounds-wallpapers.jpg&ehk=egoMlhItuRP6SDhLWP5jdMR9mMHLIvg3CDONzHpfqAo%3d&risl=&pid=ImgRaw&r=0" alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="courseDetails">
                <div className="courseViewer">
                    <h1>Explore Top <span style={{color:'rgb(63, 110, 110)'}}>Courses</span></h1>
                </div>
                <div className="courseCategories">
                    <div className="courseListWrapper">
                        <ul>
                            <li><span>Course 1</span> <span><ArrowForwardIosIcon></ArrowForwardIosIcon></span></li>
                            <li><span>Course 2</span> <span><ArrowForwardIosIcon></ArrowForwardIosIcon></span></li>
                            <li><span>Course 3</span> <span><ArrowForwardIosIcon></ArrowForwardIosIcon></span></li>
                            <li><span>Course 4</span> <span><ArrowForwardIosIcon></ArrowForwardIosIcon></span></li>
                            <li><span>Course 5</span> <span><ArrowForwardIosIcon></ArrowForwardIosIcon></span></li>
                        </ul>
                    </div>
                    <div className="Courses">
                        {data.map((course)=>(
                            <Card course={course}></Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}