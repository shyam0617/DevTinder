const mongoose=require("mongoose");

const connectDB= async ()=>{
    await mongoose.connect("mongodb+srv://shyamsunder:urt9po38s6fOtH9F@shyamnodejs.7lljv.mongodb.net/devTinder");
}

module.exports=connectDB;

