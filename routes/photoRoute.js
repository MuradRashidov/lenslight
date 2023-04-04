import express from "express";
import {createPhoto} from "../controllers/photoController";
const router = express.Router();

router.route("/").get(createPhoto)
export default router