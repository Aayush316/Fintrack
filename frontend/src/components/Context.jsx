import React, { useState, createContext  } from "react";

export const Context=createContext();

export default function ContextProvider({children}){
    const data=[
        {
            id:1,
            img:'https://cdn.elearningindustry.com/wp-content/uploads/2020/08/5-ways-to-improve-your-course-cover-design-1024x575.png',
            name:"Course1",
            instructor:'Course1 Instructor',
            price:'course1 price',
            description:'amkxmjkbkcbshjavjhabj<vjhbavakvamkxmjkbkcbshjavjhabj<vjhbavakvamkxmjkbkcbshjavjhabj<vjhbavakvamkxmjkbkcbshjavjhabj<vjhbavakv  ',
        },
        {
            id:2,
            img:'https://cdn.elearningindustry.com/wp-content/uploads/2020/08/5-ways-to-improve-your-course-cover-design-1024x575.png',
            name:"Course2",
            instructor:'Course2 Instructor',
            price:'course2 price',
            description:'amkxmjkbkcbshjavjhabj<vjhbavakvamkxmjkbkcbshjavjhabj<vjhbavakvamkxmjkbkcbshjavjhabj<vjhbavakvamkxmjkbkcbshjavjhabj<vjhbavakv  ',
        },
        {
            id:3,
            img:'https://cdn.elearningindustry.com/wp-content/uploads/2020/08/5-ways-to-improve-your-course-cover-design-1024x575.png',
            name:"Course3",
            instructor:'Course3 Instructor',
            price:'course3 price',
            description:'amkxmjkbkcbshjavjhabj<vjhbavakvamkxmjkbkcbshjavjhabj<vjhbavakvamkxmjkbkcbshjavjhabj<vjhbavakvamkxmjkbkcbshjavjhabj<vjhbavakv  ',
        },
        {
            id:4,
            img:'https://cdn.elearningindustry.com/wp-content/uploads/2020/08/5-ways-to-improve-your-course-cover-design-1024x575.png',
            name:"Course4",
            instructor:'Course4 Instructor',
            price:'course4 price',
            description:'amkxmjkbkcbshjavjhabj<vjhbavakvamkxmjkbkcbshjavjhabj<vjhbavakvamkxmjkbkcbshjavjhabj<vjhbavakvamkxmjkbkcbshjavjhabj<vjhbavakv  ',
        },
        {
            id:5,
            img:'https://cdn.elearningindustry.com/wp-content/uploads/2020/08/5-ways-to-improve-your-course-cover-design-1024x575.png',
            name:"Course5",
            instructor:'Course5 Instructor',
            price:'course5 price',
            description:'amkxmjkbkcbshjavjhabj<vjhbavakvamkxmjkbkcbshjavjhabj<vjhbavakvamkxmjkbkcbshjavjhabj<vjhbavakvamkxmjkbkcbshjavjhabj<vjhbavakv  ',
        }
    ]
    const[logged,setLogged]=useState(false)
    const[nameUser,setNameUser]=useState('')
    const[userEmail, setUserEmail]=useState('')
    const[userToken, setUserToken]=useState()

    async function fetchdata(email){

        const res= await fetch(`http://localhost:3000/api/v1/getuser/${email}`)
        const final= await res.json();
        setNameUser(final.user[0].firstName)
    }

    function handleLogged(email,token){
        setUserEmail(email)
        setUserToken(token)
        localStorage.setItem('authToken',token);
        localStorage.setItem('userEmail',email);
        setLogged(true)
        fetchdata(email)
    }

    function handleLoggedOut(){
        setLogged(false)
    }

    const values={
        logged,
        setLogged,
        handleLogged,
        handleLoggedOut,
        nameUser,
        setNameUser,
        data,
        userEmail,
        userToken,
        setUserToken,
        setUserEmail
    }
    return <Context.Provider value={values}>
        {children}
    </Context.Provider>
}