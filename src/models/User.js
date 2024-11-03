
const mongoose=require("mongoose");
const validator=require("validator");

const UserSchema=mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3
    },
    SecondName:{
        type:String,
        required:true,
        minLength:2
    },
    Email:{
        type:String,
        required:true,
        lowerCase:true,
        unique:true,
        validate(value)
        {
            if(!validator.isEmail(value))
            {
                throw new Error("Invalid email address"+value);
            }
        }
    },
    Password:{
        type:String,
        required:true,
    },
    Age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value))
            {
                throw new Error("Gender data is not valid");
            }
        }
    },
    skills:{
        type:[]
    }
},{
    Timestamp:true,
})

module.exports=mongoose.model("Users",UserSchema);