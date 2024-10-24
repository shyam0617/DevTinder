 const express=require("express");
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
 app.listen(3000,()=>{
    console.log("server running");
 })

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
