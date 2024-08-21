const Expense=require('../models/expenseModel2')

exports.submitExpense = async(req, res)=>{
    try{
        const{email,expense,product,category,budget,Date}=req.body
        const expen=await Expense.create({
            email,expense,product,category,budget,Date
        })
        res.status(200).json({
            success:true,
            expense:expen,
            message:"Expense created Successfully"
        })
    }
    catch(err){
        console.error(err.message)
        res.status(500).json({
            success:false,
            message:"Error creating expense"
        })
    }
}

exports.getExpense = async(req, res)=>{
    try{
        const email=req.params.userEmail
        const expen=await Expense.find({email:email})
        res.status(200).json({
            success:true,
            allexpenses:expen,
            message:"Expense fetche Successfully"
        })
    }
    catch(err){
        console.error(err.message)
        res.status(500).json({
            success:false,
            message:"Error fetching expense"
        })
    }
}
