const validator=require("validator");

const validateData=(req)=>{
   
    const {firstName,SecondName,Email,Password}=req.body;
    if(!firstName ||!SecondName)
        throw err("give me names");
    else if(!validator.isEmail(Email))
        throw err("give me proper email");

}
const profilevalidate=(req)=>{

    const allowededitfileds=["firstName","SecondName","skills","PhotoUrl","age","about"];
    //console.log(req.body);
    const isallowed=Object.keys(req.body).every((field)=>allowededitfileds.includes(field));
    //console.log(isallowed);
    return isallowed;
}
module.exports={
    validateData,
    profilevalidate
}