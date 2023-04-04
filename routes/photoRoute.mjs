import express from "express";
import { createPhoto } from "../controllers/photoController.mjs";

const router = express.Router();

router.route("/").post(createPhoto);

export default router;