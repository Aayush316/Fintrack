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
                <img className="courseImage" src={course.img} alt="" />
            </div>
            <div className="courseInfo">
                <p className="courseName">{course.name}</p>
                <p className="courseInstructor">{course.instructor}</p>
                <p className="coursePrice">$ {course.price}</p>
            </div>
            <div className="courseActions">
                <div className="lineDiv"></div>
                <button className="coursebtns">Details</button>
            </div>  
        </div>
    )
}