import React, { useState } from "react";
import './Card.css'

export default function Card({course}){


    const des=`${course.description.substring(0,80)}...`;
    const[readMore,setReadMore]=useState(false)

    function readMoreHandler(e){
        e.preventDefault();
        setReadMore(!readMore)
    }

    return(
        <div className="card">
            <div className="courseimg">
                <img src={course.img} style={{width:'100%', border:'2px solid black', height:'200px'}} alt="" />
            </div>
            <div className="coursedetails" style={{overflowWrap:'break-word'}}>
                <div style={{display:'flex', flexDirection:'column', gap:'3px'}}>
                    <p className="courseName" style={{fontSize:'21px', fontWeight:'600', color:'#346357'}}>{course.name}</p>
                    <p style={{fontStyle:'italic', fontWeight:'500', fontSize:'18px' }}>{course.instructor}</p>
                </div>
                <p className="coursePrice" style={{fontSize:'20px'}}>$ {course.price}</p>
                <div>
                    <span>{readMore ? course.description : des }{readMore?<a href='#' onClick={readMoreHandler}>Read Less</a>:<a href='#' onClick={readMoreHandler}>Read More</a>}</span>
                </div>
            </div>
            <div className="courseActions">
                <button className="coursebtns D">Demo</button>
                <button className="coursebtns W">Wishlist</button>
                <button className="coursebtns">Add to Cart</button>
                <button className="coursebtns S">Subscribe</button>
            </div>  
        </div>
    )
}