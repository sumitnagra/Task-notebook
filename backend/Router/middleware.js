import jwt from 'jsonwebtoken'
const JWT_SECRET = "Iamaggodboy";


const getUserById=(req,res,next)=>{
const token=req.header('auth-token');
if(!token){
    res.status(401).send({error:"Please enter the valid information "})
}
try {
    const data=jwt.verify(token,JWT_SECRET)
    req.user=data.user;
    next()
} catch (error) {
    console.log(error)
    res.status(401).send("please enter the valid token")
}
}

export default getUserById;