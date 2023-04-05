import express from "express";
import { createPhoto, getAllPhotos, getPhotoById } from "../controllers/photoController.mjs";

const router = express.Router();

router.route("/").post(createPhoto).get(getAllPhotos);
router.route("/:id").get(getPhotoById);

export default router;