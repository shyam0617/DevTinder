 const express=require("express");
 /************database creation************* */
 const connectDB=require("./config/database");
 const User=require("./models/User");
 const {validateData}=require("./utils/validatesignupdata");//data validation in signup case
 const bcrypt=require("bcrypt")//used for password hashing

/******************************************** */

 const app=express();

 const {AdminAuth,UserAuth}=require("./middlewares/middle");

 //order matters in routes
 app.use("/test/2",(req,res)=>{
    res.send("hahi");
 })

 app.use("/test",(req,res)=>{
    res.send("hello from the server!");
 })

 app.use("/test/2",(req,res)=>{
    res.send("hahi");
 })
 app.use("/profiles",(req,res)=>{
    res.send("profiles");
 })
 app.use("/questions",(req,res)=>{
    res.render("qustions page"); error
    //res.send("quesions");
 })

//  app.use("/",(req,res)=>{
//     res.send("override");
//  })


 /*****************************Advanced Routings**************************** */

 app.get("/admin",(req,res)=>{ //if we place ? after that letter that means it optional here it can work for admins and admin
    res.send("admins page opens");
 })

 app.get("/use+r",(req,res)=>{
   res.send("users profile");
 })
// app.get(/a/,(req,res)=>{
//    res.send("a page");
// })
 app.get("/admins(role)?",(req,res)=>{
    res.send("admin role dashboard opens");
 })
app.get("/*fly$",(req,res)=>{
   res.send("sufix with fly"); //suffix end with fly
})
// app.listen(3000,()=>{
//    console.log("server running");
// })

 /********************************************* Multiple route handlers*************************************** */
 app.use("/customers",
   (req,res)=>{
      res.send("customers page");
   },
   (req,res)=>{
      res.send("second customers page");
   }
 );

 app.use("/clients",
   (req,res,next)=>{
      console.log("clients page");
      next();
      //res.send("hai");//error in the console because request already resolved if we want to resolve again the it will give eror in the console but not on the localhost
   },
   (req,res,next)=>{
      console.log("2nd one");
      next();
      //res.send("2nd respons");
   },
   (req,res)=>{
      res.send("3rd response");
   }
 )

 app.use("/login",(req,res,next)=>{
   console.log("login page");
   res.send("login page");
   //next();//eror it request already resolved
 },(req,res)=>{
   res.send("2nd login page");
 });

 /*****************************************************Middle wares************************************************************** */

//  app.get("/admin/getAllData",(req,res)=>{
//     //before giving the response we have to check that the admin is the autorised user or not
//     const token="xyza";
//     const isAuthorised=token==="xyz";

//     if(!isAuthorised)
//     {
//       res.send(401).sendDate("unauthorised user");
//     }
//     else
//     {
//       res.send("admin data");
//     }
//  })

//  app.get("/admin/DeleteUser",(req,res)=>{
//    //before deleting check the admin is valid one  or not
//    const token="xyz";//actually we have to get data from url
//    const isAuthorised=token==="xyz";

//    if(!isAuthorised)
//    {
//       res.send(401).sendData("unauthorised admin");
//    }
//    else
//    {
//       res.send("delete user");
//    }
//  })

 //problem is that we have to check the valid one or not for each admin api 
 //here we have to use middle ware concept

 //using middlewares
//  app.use("/admin",(req,res,next)=>{
//    const token="xy";
//    const isAuthorised=token==="xya";
//    if(!isAuthorised)
//    {
//       res.send(401).sendDate("unauthorised user");
//    }
//    else
//    {
//       next();
//    }
//  })
 app.use("/admin/getAllData",AdminAuth,(req,res)=>{
   res.send("display all data");
 })
 app.use("/admin/deleteUser",AdminAuth,(req,res)=>{
   res.send("user delted successfully");
 })
 app.get("/user/getInfo",UserAuth,(req,res)=>{
   res.send("your info");
 })
//diffrence between app.all and app.use
/***********************************************************************Database connection **********************************/

connectDB().then(()=>{

   console.log("database connected"); //after database succesfully connected then only server start listening;

   app.listen(3000,()=>{
         console.log("server running");
       })

}).catch((err)=>{
   console.error(err);
});

app.use(express.json());//acts as a middle ware its convert the json object into js object and keeps in the req.body

// app.post("/signup",async(req,res)=>{
  
//    // const UserOne={
//    //    firstName:"Shyam",
//    //    LastName:"Sunder",
//    //    Email:"abc@gmail.com",
//    //    Age:60,
//    //    gender:"Male",
//    // }
//    // const UserTwo={
//    //    firtname:"gowtham",//not showed in database because schema should be casesensitive
//    //    LastName:"raj",
//    //    Email:"cdc@gmail.com",
//    //    age:70,//not showed in database because schema should be casesensitive
//    //    gender:"Male",
//    // }
//    // const user=new User(UserOne);
//    // const u=new User(UserTwo);
//    // try{
//    //    await user.save();
  
//    //    await u.save();
//    //    res.send("data stored sucessfully");
//    // }
//    // catch(err){
//    //    res.send("erorr not stored database"+err.message);
//    // }
// /***********dynamic from postman */
// const u=new User(req.body)
// try{
//    await u.save();
//    res.send("data stored sucessfully");
// }
// catch(err){
//    res.send(err.message);
// }
// }
// )
/*************************************************signup************************** */
app.post("/signup",async(req,res)=>{
   //before adding the data into the database we have to validate the data
   try{

      validateData(req);

      const {Password}=req.body;
      const hashPassword= await bcrypt.hash(Password,3);
      console.log(hashPassword);

      const {firstName,SecondName,Email,age,gender,skills}=req.body;
      const u=new User({
         firstName,
         SecondName,
         Email,
         age,
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

})
/***********************************************login***************************** */
app.post("/loginuser",async(req,res)=>{
    console.log("login api");
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
   
})
/*******get users based on email */
app.get("/get",async(req,res)=>{
   
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

app.get("/allUsers",async(req,res)=>{
   try{
      const allUsers=await User.find({});
      res.send(allUsers);
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