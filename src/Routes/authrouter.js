
const express=require("express");

const authrouter=express.Router();
const {validateData}=require("../utils/validatesignupdata");
const bcrypt=require("bcrypt")//used for password hashing
const User=require("../models/User");
const jwt=require("jsonwebtoken");//to create the webtoken


authrouter.post("/signup",async(req,res)=>{
    //before adding the data into the database we have to validate the data
    try{
 
       //validateData(req);
 
       const {Password}=req.body;
       const hashPassword= await bcrypt.hash(Password,3);
       console.log(hashPassword);
 
       const {firstName,SecondName,Email,Age,gender,skills}=req.body;
       const u=new User({
          firstName,
          SecondName,
          Email,
          Age,
          Password:hashPassword,
          gender,
          skills,
       });
       await u.save();
       res.send("data stored sucessfully");
 
    }
    catch(err)
    {
       res.status(400).send(err.message);
    }
 
 });

authrouter.post("/loginuser",async(req,res)=>{

   try{
         const {Email,Password}=req.body;

         const one=await User.findOne({Email:Email});
         //console.log(one);
         if(!one)
         {
            throw new Error("invalid credintials");
         }
         const isPassword= await bcrypt.compare(Password, one.Password);
         //console.log(isPassword);

         if(isPassword)
         {  
            const token=await jwt.sign({_id:one._id},"shyam1564",{expiresIn:"1d"});
            //using schema method const token=await user.getJWT();
            res.cookie("token",token);
            res.send("login sucessfullly");
         }
         else
         {
            throw new Error("invalid credintials");
         }

   }
   catch(err)
   {
      res.status(400).send(err.message);
   }
   
});

 module.exports=authrouter;
