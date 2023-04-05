import User from "../models/userModel.mjs";
import byrcpt from "bcrypt"

const createUser = async (req,res) => {
   try{
    const users = await User.create(req.body) 
    res.status(201).json({
        succeded:"true",
        users
    })
   }
   catch(error){
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
        res.status(200).send("You are logged in")
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
         error
 
     })
    }
 }
export {createUser,loginUser}