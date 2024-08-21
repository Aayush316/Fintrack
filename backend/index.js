const express=require('express')
const cors=require('cors')


const app = express()

app.use(cors());
require('dotenv').config()

app.use(express.json())

const routes=require('./routes/Routes')
app.use('/api/v1',routes)

PORT=process.env.PORT || 4000



app.listen(PORT,()=>{
    console.log(`Server started successfully at ${PORT}`)
})

const dbConnect=require('./config/database')
dbConnect()

app.get('/', (req,res)=>{
    res.send(`<h1>This is homepage</h1>`)
})
