
const express=require("express");

const authRouter=express.Router();
const {validateData}=require("../utils/validatesignupdata");
const bcrypt=require("bcrypt")//used for password hashing
const User=require("../models/User");
const jwt=require("jsonwebtoken");//to create the webtoken


authRouter.post("/signup",async(req,res)=>{
    //before adding the data into the database we have to validate the data
    try{
 
       validateData(req);
 
       const {Password}=req.body;
       const hashPassword= await bcrypt.hash(Password,3);
       //console.log(hashPassword);
 
       const {firstName,SecondName,Email,gender}=req.body;
       const u=new User({
          firstName,
          SecondName,
          Email,
          gender,
          Password:hashPassword,
       });
       const savedUser=await u.save();
       //console.log(savedUser);
       const token = await savedUser.getJWT();
      // console.log(token);
       res.cookie("token", token, {
         expires: new Date(Date.now() + 8 * 3600000),
       });
   
       res.json({ message: "User Added successfully!", data: savedUser });
      //  res.send({message:"data stored sucessfully",
      //    data:u
      //  });
    }
    catch(err)
    {
       res.status(400).send(err.message);
    }
 
 });

authRouter.post("/loginuser",async(req,res)=>{

   try{
         const {EmailId,Password}=req.body;
         //console.log(EmailId);
         const one=await User.findOne({Email:EmailId});
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
            //console.log("hai");
            res.send(one);
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

authRouter.post("/logout", async(req,res)=>{
   res.cookie("token",null,{
      expires:new Date(Date.now())
   })
   res.send("logout sucessfully");
});

 module.exports=authRouter;
