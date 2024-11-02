const mongoose=require("mongoose");

const connectDB= async ()=>{
    await mongoose.connect("mongodb+srv://shyamsunder:shyamsundervudumu@shyamnodejs.7lljv.mongodb.net/devTinder");
}

module.exports=connectDB;

