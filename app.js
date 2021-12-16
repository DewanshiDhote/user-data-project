const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
require('dotenv').config()
let app = express()
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

mongoose.connect("mongodb://localhost:27017/dewanshiDB")
.then((result)=>{
 console.log("connected")
}).catch((error)=>{
    console.log("unable to connect database")
})

const userRouter = require('./router/user.router')
app.use('/user',userRouter)

const port = 5000
app.listen(port,()=>{
    console.log("server is running on the ",port);
})