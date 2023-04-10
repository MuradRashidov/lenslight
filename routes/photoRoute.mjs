import express from "express";
import { createPhoto, deletePhoto, getAllPhotos, getPhotoById, updatePhoto } from "../controllers/photoController.mjs";

const router = express.Router();

router.route("/").post(createPhoto).get(getAllPhotos);
router.route("/:id").get(getPhotoById);
router.route("/:id").delete(deletePhoto);
router.route("/:id").put(updatePhoto);

export default router;