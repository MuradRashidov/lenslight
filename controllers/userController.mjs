import User from "../models/userModel.mjs";
import byrcpt from "bcrypt";
import jwt from "jsonwebtoken";
import Photo from "../models/photoModel.mjs";
// import dotenv from "dotenv";
// dotenv.config();


const createUser = async (req,res) => {
   try{
    const users = await User.create(req.body) 
    res.status(200).json({
        user:users._id
    })
   }
   catch(error){
    let errors2 = {};
    if(error.code === 11000){
        errors2.email = "This email have been registered."
    }
    if(error.name === "ValidationError"){
        Object.keys(error.errors).forEach((key)=>{
            errors2[key] = error.errors[key].message;
        })
    }
    console.log(errors2);
    res.status(400).json(errors2)
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
 const getDashboardPage = async (req,res) => {
    const photos = await Photo.find({user:res.locals.user._id})
    res.render("dashboard",{
        link:"dashboard",
        photos
    })
}
const getAllUsers = async (req, res) => {
    try {
      const users = await User.find({ _id: { $ne: res.locals.user._id } });
    users.forEach(user=>console.log(user._id))
      const photos = await Photo.find({user: res.locals.user._id })
     // console.log(photos)

      res.status(200).render('users', {
        users,
        photos,
        link: 'users',
      });
    } catch (error) {
      res.status(500).json({
        succeded: false,
        error,
      });
    }
  };
 const getAUser = async (req,res) => {
    try{
        const photos = await Photo.find({user: req.params.id })

     const user = await User.findById({_id:req.params.id})
     res.status(200).render("user",{
        user,
        photos,
        link:"users"
     })
    }
    catch(error){
     res.status(500).json({
         succeded:false,
         error:error.message
 
     })
     console.log(error)
    }
 }
export {createUser,loginUser,getDashboardPage,getAllUsers,getAUser}