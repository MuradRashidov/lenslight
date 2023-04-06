import express from "express"
import { getAboutPage, getIndexPage, getLoginPage, getLogout, getRegisterPage } from "../controllers/pageComtrollers.js";
const router = express.Router();

router.route("/").get(getIndexPage);
router.route("/about").get(getAboutPage);
router.route("/register").get(getRegisterPage);
router.route("/login").get(getLoginPage);
router.route("/logout").get(getLogout);

export default router;