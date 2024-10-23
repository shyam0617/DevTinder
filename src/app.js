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

 app.use("/",(req,res)=>{
    res.send("override");
 })

 app.listen(3000,()=>{
    console.log("server running");
 })