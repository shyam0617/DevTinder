
const jwt=require("jsonwebtoken");
const User=require("../models/User");

const AdminAuth=("/admin",(req,res,next)=>{
    const getToken="xyz";
    const isAuthorised=getToken==="xyz";
    if(!isAuthorised)
    {
        res.send(401).sendData("unauthorised user");
    }
    else
    {
        next();
    }
})

const userauth=async(req,res,next)=>{
  try{
    const{token}=req.cookies;
    //console.log(token);
    if(!token)
    {
        return res.status(401).message("please login");
    }
    const decodeObj=await jwt.verify(token,"shyam1564");

    const {_id}=decodeObj;

    const user=await User.findById(_id);
    console.log(user);
    if(!user)
    throw new Error("user not found");
    
    req.user=user;
    next();
  }
  catch(err)
  { 
    res.status(400).send("please login");
  }
    

}

module.exports={
    AdminAuth,
    userauth,
};