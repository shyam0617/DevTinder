
const mongoose=require("mongoose");
const validator=require("validator");
const jwt=require("jsonwebtoken");

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
    PhotoUrl: {
        type: String,
        default: "https://geographyandyou.com/images/user-profile.png",
        validate(value) {
          if (!validator.isURL(value)) {
            throw new Error("Invalid Photo URL: " + value);
          }
        },
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
    age:{
        type:Number,
        //required:true,
        min:[18,'age should be greater than 18'],
        max:[70]
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
    },
    about:{
        type:String,
    }
},{
    Timestamp:true,
});
UserSchema.methods.getJWT=async function (){//do not use arrow fucntions here this keyword behaves different in arrow funcition
    const user=this;

    const token=await jwt.sign({_id:user._id},"shyam1564");
    return token;
}
UserSchema.methods.validatePassword=async function(passwordInputeByUser){
    const user=this;
    const passwordHash=user.password;

    const isPasswordValid=await bcrypt.compare(passwordInputeByUser,passwordHash);//order must it important
    return isPasswordValid;
}

module.exports=mongoose.model("Users",UserSchema);