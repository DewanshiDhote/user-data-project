const mongoose = require("mongoose")
const User = mongoose.Schema({
    name:String,
    mobile:{type:Number,required:true,unique:true},
    password:String
},{
    timestamps:true
})

module.exports=mongoose.model("User",User)