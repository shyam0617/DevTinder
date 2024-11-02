
const mongoose=require("mongoose");

const UserSchema=mongoose.Schema({
    firstName:{
        type:String
    },
    SecondName:{
        type:String
    },
    Email:{
        type:String
    },
    Age:{
        type:Number
    },
    gender:{
        type:String
    }
})

module.exports=mongoose.model("Users",UserSchema);