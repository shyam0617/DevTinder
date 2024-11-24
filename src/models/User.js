
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
        //required:true,
        min:[18,'age should be greater than 18'],
        max:[50]
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
});
UserSchema.methods.getJWT=async function (){//do not use arrow fucntions here this keyword behaves different in arrow funcition
    const user=this;

    const token=await jwt.sign({_id:user._id},"shyam1564",{
        expiresIN:"7d",
    });
    return token;
}
UserSchema.methods.validatePassword=async function(passwordInputeByUser){
    const user=this;
    const passwordHash=user.password;

    const isPasswordValid=await bcrypt.compare(passwordInputeByUser,passwordHash);//order must it important
    return isPasswordValid;
}

module.exports=mongoose.model("Users",UserSchema);