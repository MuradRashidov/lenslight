import User from "../models/userModel.mjs";
import byrcpt from "bcrypt";
import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config();


const createUser = async (req,res) => {
   try{
    const users = await User.create(req.body) 
    res.redirect("/login")
   }
   catch(error){
    let errors2 = {};
    if(error.name === "ValidationError"){
        Object.keys(error.errors).forEach((key)=>{
            errors2.key = error.errors[key].message;
        })
    }
    console.log(errors2);
    res.status(500).json({
        succeded:false,
        error

    })
   }
}
const loginUser = async (req,res) => {
    try{
     const {userName,password} = req.body;
     const user = await User.findOne({userName});
     let isSame = false;
     if(user){
        isSame = await byrcpt.compare(password,user.password)
     }
     else{
      return  res.status(401).json({
            succeded:false,
            error:"There is not this user"
    
        })
     }
     if(isSame){
        const token = createToken(user._id);
        res.cookie("jwt",token,{
            httpOnly:true,
            maxAge:1000*60*60*24
        })
        res.redirect("/users/dashboard")
     }
     else{
        res.status(401).json({
            succeded:false,
            error:"Passports are not mached"
    
        })
     }
    }
    catch(error){
     res.status(500).json({
         succeded:false,
         error:error.message
 
     })
    }
 }
 const createToken = (userId) => {
   return jwt.sign({userId},process.env.JWT_WEB_TOKEN,{expiresIn:"1d"});
 }
 const getDashboardPage = (req,res) => {
    res.render("dashboard",{
        link:"dashboard"
    })
}
export {createUser,loginUser,getDashboardPage}