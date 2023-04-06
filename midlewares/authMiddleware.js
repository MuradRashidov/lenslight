import User from "../models/userModel.mjs";
import jwt from "jsonwebtoken";

const checkUser = async(req,res,next) => {
     const token = req.cookies.jwt;
     if(token){
        jwt.verify(token,process.env.JWT_WEB_TOKEN,async(err,decodedToken)=>{
            if(err){
                console.log(err.message);
                res.locals.user = null;
                next();

            }
            else{
                const user = await User.findById(decodedToken.userId);
                res.locals.user = user;
                next();

            }
        })
     }
     else{
        res.locals.user = null;
        next();
     }
}
const authenticateToken = async(req,res,next) => {
    // const authHeader = req.header("authorization");
    // console.log("Auth header ", authHeader);
    try{
        const token = req.cookies.jwt;
        console.log(token);
        if(token){
            jwt.verify(token,process.env.JWT_WEB_TOKEN,(err)=>{
                if(err){
                    console.log(err.message);
                    res.redirect("/login")

                }
                else{
                    next();
                }
            })

        }
        else{
            res.redirect("/login")

        }
    
       
    }

    catch(error){
      res.status(401).json({
        succeded:false,
        error:error.message

      })
    }
    

}

export  {authenticateToken,checkUser}