
const AdminAuth=("/admin",(req,res,next)=>{
    const getToken="xyz";
    const isAuthorised=getToken==="xyz";
    if(!isAuthorised)
    {
        res.send(401).sendData("unauthorised user");
    }
    else
    {
        next();
    }
})

const UserAuth=("/user",(req,res,next)=>{
    const getToken="xyz";
    const isAuthorised=getToken==="xyz";
    if(!isAuthorised)
    {
        res.send(401).sendData("unauthorised user");
    }
    else
    {
        next();
    }
})
module.exports={
    AdminAuth,
    UserAuth,
};