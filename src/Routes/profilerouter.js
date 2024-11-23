const express=require("express");

const {userauth}=require("../middlewares/middle");

const profilerouter=express.Router();

profilerouter.get("/profile",userauth,async(req,res)=>{
    try{
           const user=req.user;
           res.send(user);
    }
    catch(err)
    {
     res.status(400).send(err.message);
    }
     
});

module.exports=profilerouter;