import express from "express";
//import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDataBase from "./connectDataBase.js";
import pageRoute from "./routes/pageRoute.js";
import photoRoutes from "./routes/photoRoute.mjs";
import userRoute from "./routes/userRoute.mjs";
import { checkUser } from "./midlewares/authMiddleware.js";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";



dotenv.config();
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME, 
    api_key:process.env.CLOUD_API_KEY, 
    api_secret:process.env.CLOUD_API_SECRET, 
})
const {PORT} = process.env;


connectDataBase();
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(fileUpload({useTempFiles:true}))
app.set("view engine","ejs");
// app.get("/", (req,res) => res.render("index"));
// app.get("/about", (req,res) => res.render("index"));
app.use("*",checkUser);
app.use("/",pageRoute);
app.use("/users",userRoute);

app.use("/photos",photoRoutes);

app.listen(PORT,()=>console.log(PORT));