const User=require('../models/userModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
require("dotenv").config();

exports.createAcc = async(req, res)=>{
    try{
        const{firstName,lastName,email,setpassword,confirmpassword,Date}=req.body
        
        const existingUser=await User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exists"
            })
        }
        console.log(setpassword)
        console.log(confirmpassword)
        if(setpassword!==confirmpassword){
            return res.status(500).json({
                success:false,
                message:"Passwords do not matched"
            })
        }

        let hashedPassword;
        try{
            hashedPassword=await bcrypt.hash(setpassword, 10)
        }
        catch(err){
            return res.status(500).json({
                success:false,
                message:"Password Hasing Failes"
            })
        }

        const newuser=await User.create({
            firstName,lastName,email,setpassword:hashedPassword,confirmpassword:hashedPassword,Date
        })

        res.status(200).json({
            success:true,
            user:newuser,
            message:"Account created Successfully"
        })
    }
    catch(err){
        console.error(err.message)
        res.status(500).json({
            success:false,
            message:"Error creating Account"
        })
    }
}

exports.loginAcc = async(req, res)=>{
    try{
        const{email,password}=req.body
        let validUser=await User.findOne({email})

        if(!validUser){
            return res.status(401).json({
                success:false,
                message:"User does not exists"
            })
        }

        const payload={
            email:validUser.email,
            id:validUser._id
        };

        if(await bcrypt.compare(password, validUser.confirmpassword)){
            let token=jwt.sign(payload,
                               process.env.JWT_SECRET,
                               {
                                expiresIn:"2h",
                               }
            );

            validUser=validUser.toObject();
            validUser.token=token
            validUser.setpassword=undefined
            validUser.confirmpassword=undefined

            return res.status(200).json({
                success:true,
                token: token,
                userInfo: validUser,
                message:"User Logged In Successfully"
            })
        }
        else{
            return res.status(500).json({
                success:false,
                message:"Invalid password"
            })
        }

    }
    catch(err){
        console.error(err.message)
        res.status(500).json({
            success:false,
            message:"Error logging in"
        })
    }
}

exports.verifyToken = async(req, res)=>{
    try{
        const{email,token}=req.body
        if(!email || !token){
            return res.status(400).json({
                success:false,
                message:"Email or Token missing"
            })
        }
        console.log("hi")
        console.log(token)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("hi")
        if(decoded.email==email){
            return res.status(200).json({
                success:true,
                message:"Token verified succesfully"
            })
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Token invalid"
            })
        }
    }catch (error) {
        console.error('Token verification error:', error);
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
}

exports.getUser = async(req, res)=>{
    try{
        const email=req.params.email
        const availUser=await User.find({email: email})


        res.status(200).json({
            success:true,
            user:availUser,
            message:"Login Successfull"
        })
    }
    catch(err){
        console.error(err.message)
        res.status(500).json({
            success:false,
            message:"Error logging in"
        })
    }
}
