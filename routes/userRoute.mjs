import express from "express";
import { createUser, follow, getAUser, getAllUsers, getDashboardPage, loginUser, unfollow } from "../controllers/userController.mjs";
import { authenticateToken } from "../midlewares/authMiddleware.js";

const router = express.Router();

router.route("/register").post(createUser);
router.route("/login").post(loginUser);
router.route("/dashboard").get(authenticateToken,getDashboardPage);
router.route("/").get(authenticateToken,getAllUsers);
router.route("/:id").get(authenticateToken,getAUser);
router.route("/:id/follow").put(authenticateToken,follow);
router.route("/:id/unfollow").put(authenticateToken,unfollow);


export default router;