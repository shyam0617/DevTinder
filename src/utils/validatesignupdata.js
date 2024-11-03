const validator=require("validator");

const validateData=(req)=>{
   
    const {firstName,SecondName,Email,Password}=req.body;
    if(!firstName ||!SecondName)
        throw err("give me names");
    else if(!validator.isEmail(Email))
        throw err("give me proper email");

}
module.exports={
    validateData
}