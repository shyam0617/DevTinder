const mongoose=require("mongoose");

const connectionRequestSchema=new mongoose.Schema(
    {
        fromUserId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Users",
            required:true,
        },
        toUserId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Users",
            required:true
        },
        status:
        {
            type:String,
            enum:{
                values:["accepted","rejected","ignored","interested"],
                message:`{VALUE} is incorrect status type`,
            }
        },
    },{
        timestamps:true
    }
);
connectionRequestSchema.pre("save",function(next){
   const connectionRequest=this;
   //check if the fromuserid is same as to userid
   if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
    throw new Error("Cannot send connection request to yourself");
   }
   next();
})
const ConnectionRequestModel=new mongoose.model(
    "ConnectionRequest",
    connectionRequestSchema
);

module.exports=ConnectionRequestModel;