 const express=require("express");
 const app=express();
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
app.get(/a/,(req,res)=>{
   res.send("a page");
})
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