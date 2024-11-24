const express=require("express");

const {userauth}=require("../middlewares/middle");
const{profilevalidate}=require("../utils/validatesignupdata");

const profileRouter=express.Router();

profileRouter.get("/profile/view",userauth,async(req,res)=>{
    try{
           const user=req.user;
           res.send(user);
    }
    catch(err)
    {
     res.status(400).send(err.message);
    }
     
});
profileRouter.patch("/profile/edit",userauth, async(req,res)=>{

    try{   
        if(!profilevalidate(req))
        {
            throw new Error("error : check the inputs");
        }   console.log(req.user);

             if(!req.user)
             throw new Error("invalid user");

            const loggeduser=req.user;
            loggeduser.firstName=req.body.firstName;
            console.log(loggeduser);
            //Object.keys(req.body).forEach(key=>(loggeduser[key]=req.body[key]));
            console.log("hai");
            try{
                await loggeduser.save();
                res.send(`${loggeduser.firstName},profile updated sucessfully`);
            }
            catch(err)
            {
               console.error("error saving the user");
               throw new Error("saving is not possible");
            }
            
        }
    catch(err)
    {
        res.status(200).send("update not possible");
    }  
})

module.exports=profileRouter;