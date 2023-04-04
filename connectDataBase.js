import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const {MONGO_URI} = process.env;
const connectDataBase = () => {
    mongoose.connect(MONGO_URI,{
        dbName:"success",
        useNewUrlParser:true
    })
    .then(()=>console.log("db connection success is successful"))
    .catch((err)=>console.log(err.message))
}

export default connectDataBase;