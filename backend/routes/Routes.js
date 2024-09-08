const express=require('express')

const router=express.Router()

const{submitExpense, getExpense}=require('../controllers/expenseController')
const{createAcc, loginAcc, getUser, verifyToken}=require('../controllers/authenticationController')
const{savingsPlanRoute}=require('../controllers/savingsPlanRoute')

router.post('/newexpense', submitExpense)
router.get('/getexpenses/:userEmail', getExpense)
router.post('/createaccount', createAcc)
router.post('/loginaccount', loginAcc)
router.post('/verifytoken', verifyToken)
router.get('/getuser/:email', getUser)
router.post('/savings', savingsPlanRoute);


module.exports=router