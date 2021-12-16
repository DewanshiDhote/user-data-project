const router=require('express').Router()
const User = require("./../models/user.model")
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.post('/register',(req,res)=>{
    try {
        new User(req.body)
        .save()
        .then((result)=>{
              res.send({message:'user register succesfully',data:result})
        }).catch((error)=>{
            if(error.code==11000){
            res.send({message:'user already registered',error:error})
            }
        })

    } catch(error){
        console.log(error)
        res.send({message:'unable to register',status:400})
         
    }
})

router.post('/login',(req,res)=>{
    try{
        const mobile=req.body.mobile
        const password = req.body.password
        User.findOne({mobile:req.body.mobile})
        .then((result)=>{
            if(result.password==password)
            {
              var usertoken =jwt.sign({
                  userId:result._id
              },process.env.SECRET_KEY)

              res.send({message:'user login succesfully',data:result,token:usertoken})
            }else{
            res.send({message:'incorrect paassword'})
            }
        }).catch((error)=>{
            console.log(error)
            res.send({message:'mobile number is not registerd',error:error})
        })
    } catch(error){
        console.log(error)
        res.send({message:'invalid data',status:400})

    }
})

module.exports=router