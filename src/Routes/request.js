const express=require("express");
const { userauth } = require("../middlewares/middle");
const ConnectionRequestModel=require("../models/connectionrequest");

const requestRouter=express.Router();

requestRouter.post("/request/send/:status/:toUserId",userauth, async (req,res)=>{
  
    try{
       const fromUserId=req.user;
       const toUserId=req.params.toUserId;
       const status=req.params.status;

       const ConnectionRequest=new ConnectionRequestModel({
        fromUserId,
        toUserId,
        status,
       })
       
       const data=await ConnectionRequest.save();
       res.json({
        message:`Connection sent sucessfully`,
        data,
       })
    }
    catch(err)
    {
        res.status(400).send("ERROR: "+err.message);
    }
});
module.exports=requestRouter;
