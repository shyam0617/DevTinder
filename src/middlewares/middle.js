
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

// const UserAuth=("/user",(req,res,next)=>{
//     const getToken="xyz";
//     const isAuthorised=getToken==="xyz";
//     if(!isAuthorised)
//     {
//         res.send(401).sendData("unauthorised user");
//     }
//     else
//     {
//         next();
//     }
// })
//userauthentication middlewares

const userauth=async(req,res,next)=>{
  try{
    const{token}=req.cookies;
    //console.log(token);
    if(!token)
    {
        throw new Error("token is not valid");
    }
    const decodeObj=await jwt.verify(token,"shyam1564");

    const {_id}=decodeObj;

    const user=await User.findById(_id);
    if(!user)
    throw new Error("user not found");
    
    req.user=user;
    next();
  }
  catch(err)
  { 
    res.status(400).send("error "+err.message);
  }
    

}

module.exports={
    AdminAuth,
    userauth,
};