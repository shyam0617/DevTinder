 const express=require("express");
 /************database creation************* */
 const connectDB=require("./config/database");
 const User=require("./models/User");
 const {validateData}=require("./utils/validatesignupdata");//data validation in signup case
 const bcrypt=require("bcrypt")//used for password hashing
 const cookieparser=require("cookie-parser");//for reading the cookie
 const jwt=require("jsonwebtoken");//to create the webtoken
 const cors = require('cors')
 
/******************************************** */

 const app=express();
 app.use(cors({
   origin:"http://localhost:5173",
   credentials:true,
 }));

 const {AdminAuth,userauth}=require("./middlewares/middle");

//diffrence between app.all and app.use
/***********************************************************************Database connection **********************************/
connectDB().then(()=>{

   console.log("database connected"); //after database succesfully connected then only server start listening;

   app.listen(3000,()=>{
         console.log("server running on 3000");
       })

}).catch((err)=>{
   console.error(err);
});

app.use(express.json());//acts as a middle ware its convert the json object into js object and keeps in the req.body
app.use(cookieparser());//for cookie reading middleware
/**********************************************************************Express Router************************************** */
const authRouter=require("./Routes/authrouter");
const profileRouter=require("./Routes/profilerouter");
const requestRouter=require("./Routes/request");
const userRouter = require("./Routes/Connections");


app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);


app.get("/profile",userauth,async(req,res)=>{
  try{
         const cookie=req.cookies;
         const {token}=cookie;
         //console.log("hai");
         if(!token)
         {
            throw new Error("token not valid");
         }
         
         const decodedMessage=await jwt.verify(token,"shyam1564");
         const {_id}=decodedMessage;

         //console.log(token);//we can cant read the cookie directly for that we have to install npm i cokie-pareser 
         console.log(_id);
         const t=await User.find({_id:_id});
         if(!t)
         {
            throw new Error("user not found");
         }
         res.send(t);
  }
  catch(err)
  {
   res.status(400).send(err.message);
  }
   
});
/*******get users based on email */
app.get("/get",userauth,async(req,res)=>{
   
   const userEmail=req.body.Email;
   try{
      const one=await User.find({Email:userEmail});
      res.send(one);
   }
   catch(err)
   {
      res.status(400).send(err.message);
   }
  
})


app.delete("/deletebyId",async(req,res)=>{
   
   const userId=req.body.userId;

   try{
      //const user=await User.findByIdAndDelete({_id:userId});
      const user=await User.findByIdAndDelete(userId);
      res.send(user);
   }
   catch(err)
   {
      res.send(err.message);
   } 
})
/***************************validatores patch api*********** */
app.patch("/user",async(req,res)=>{
   const userId=req.body.userId;
   const data=req.body;
   try{
      const user=await User.findByIdAndUpdate({_id:userId},data);
      res.send(user);
      runValidators:true;
   }
   catch(err)
   {
      res.status(400).send(err.message);
   }
})
/****************************api level validation********* we make sure that all fields not accessible for update*/
app.patch("/user/:userId",async(req,res)=>{
   const userId=req.params?.userId;
   const data=req.body;

   try{
      const allowed_updates=["skills","age","LastName"];
      const isUpdateAllowed=Object.keys(data).every((k)=>allowed_updates.includes(k));

      if(!isUpdateAllowed)
      {
         throw new Error("Update not allowed");
      }
      if(data?.skills.length>10)
      {
         throw new Error("Skills cannot more than 10");
      }
      const user=await User.findByIdAndUpdate({_id:userId},data);
      returnDocument:"after";
      runValidators:true;
      res.send(user);
   }
   catch(err)
   {
      res.status(400).send(err.message);
   }
})
