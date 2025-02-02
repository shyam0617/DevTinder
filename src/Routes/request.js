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
       const statusAllowed=["interested","ignored"];

       if(!statusAllowed.includes(status))
       return res.status(400).send("status not valid");
       
       const isPresent=await ConnectionRequestModel.findOne({
        $or:[
            {
               fromUserId,toUserId
            },
            {
                fromUserId:toUserId,toUserId:fromUserId
            }
        ]
       })
       if(isPresent)
       {
         return res.status(400).send({message:"Connection request already exists"});
       }

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

// requestRouter.post("/request/review/:status/:toUserId",userauth,  async(req,res)=>{
   
//     try{ 
//          const loggeduser=req.user
//          const status=req.params.status;
//          const userid=req.params.toUserId;
//          const isallowed=["accepted","rejected"];
//           console.log(isallowed.includes(status));
//          if(!isallowed.includes(status))
//          return res.status(400).json({message:"status is not valid"});
//          console.log(loggeduser._id);
//          console.log(userid);
//          const ConnectionRequest=await ConnectionRequestModel.findOne({
//             fromUserId:userid,
//             toUserId:loggeduser._id,
//             status:"interested",
//          });
//         console.log(ConnectionRequest);
//          if(!ConnectionRequest)
//          {
//             res.status(400).json({message:"request not found"});
//          }
//          ConnectionRequest.status=status;
//          console.log(ConnectionRequest);

//          const data=await ConnectionRequest.save();
//          res.json({messaage:`successfully ${status} profile`,data:data});
//     }
//     catch(err)
//     {   
//         console.error(err);
//         res.status(400).json({message:"review is not possible"});
//     }
// })
requestRouter.post(
    "/request/review/:status/:requestId",
    userauth,
    async (req, res) => {
      try {
        const loggedInUser = req.user;
        const { status, requestId } = req.params;
        // console.log("hi");
        // console.log(status+" "+requestId);
        const allowedStatus = ["rejected","accepted"];
        if (!allowedStatus.includes(status)) {
            //console.log("ahi");
          return res.status(400).json({ messaage: "Status not allowed!" });
        }
  
        const connectionRequest = await ConnectionRequestModel.findOne({
          _id: requestId,
          toUserId: loggedInUser._id,
          status: "interested",
        });
        if (!connectionRequest) {
          return res
            .status(404)
            .json({ message: "Connection request not found" });
        }
  
        connectionRequest.status = status;
  
        const data = await connectionRequest.save();
        //console.log(data);
        res.json({ message: "Connection request " + status, data });
      } catch (err) {
        res.status(400).send("ERROR: " + err.message);
      }
    }
  );
  
module.exports=requestRouter;
