import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import validator from "validator";
//const {Schema} = mongoose.Schema;
const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true,"userName is important"],
        lowercase:true,
        validate:[validator.isAlphanumeric,"Only alphanumeric caracters"]
    },
    email:{
        type:String,
        required:[true,"Email is important"],
        unique:true,
        validate:[validator.isEmail,"Valid email is required"]
    },
    password:{
      type:String,
      required:[true,"Password is important"],
      minLength:[4,"At least 4 caracters"],
      default:Date.now,
    },
    followers:[
        {
            type: Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    followings:[
        {
            type: Schema.Types.ObjectId,
            ref:"User"
        }
    ]
},
 {
    timestamps:true
 }
);

userSchema.pre("save",function(next){
    const user = this;
    bcrypt.hash(user.password,10,(err,hash)=>{
        user.password = hash;
        next();
    })
})

    
const User = mongoose.model("User",userSchema);
export default User;
