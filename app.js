import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDataBase from "./connectDataBase.js";
import pageRoute from "./routes/pageRoute.js";
import photoRoutes from "./routes/photoRoute.js";



dotenv.config();
const {PORT} = process.env;


connectDataBase();
const app = express();
app.use(express.static("public"))
app.set("view engine","ejs");
// app.get("/", (req,res) => res.render("index"));
// app.get("/about", (req,res) => res.render("index"));
app.use("/",pageRoute)
app.use("/about",photoRoutes)
app.listen(PORT,()=>console.log(PORT));