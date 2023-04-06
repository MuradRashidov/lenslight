import express from "express";
import { createUser, getDashboardPage, loginUser } from "../controllers/userController.mjs";
import { authenticateToken } from "../midlewares/authMiddleware.js";

const router = express.Router();

router.route("/register").post(createUser);
router.route("/login").post(loginUser);
router.route("/dashboard").get(authenticateToken,getDashboardPage);

export default router;