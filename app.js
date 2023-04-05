import express from "express";
//import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDataBase from "./connectDataBase.js";
import pageRoute from "./routes/pageRoute.js";
import photoRoutes from "./routes/photoRoute.mjs";
import userRoute from "./routes/userRoute.mjs";



dotenv.config();
const {PORT} = process.env;


connectDataBase();
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
// app.get("/", (req,res) => res.render("index"));
// app.get("/about", (req,res) => res.render("index"));
app.use("/",pageRoute)
app.use("/users",userRoute)

app.use("/photos",photoRoutes)

app.listen(PORT,()=>console.log(PORT));