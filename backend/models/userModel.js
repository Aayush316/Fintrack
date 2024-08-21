const mongoose = require('mongoose');

const getCurrentISTDateTime = () => {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istTime = new Date(now.getTime() + istOffset);
    return istTime;
};

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim: true
    },
    lastName:{
        type:String,
        required:true,
        trim: true
    },
    email:{
        type:String,
        required:true,
        trim: true
    },
    setpassword:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    },
    Date: {
        type: Date,
        default: getCurrentISTDateTime
    }
});

module.exports = mongoose.model("User", userSchema);
