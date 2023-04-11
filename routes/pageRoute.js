import express from "express"
import { getAboutPage, getContactPage, getIndexPage, getLoginPage, getLogout, getRegisterPage, sendMail } from "../controllers/pageComtrollers.js";
const router = express.Router();

router.route("/").get(getIndexPage);
router.route("/about").get(getAboutPage);
router.route("/register").get(getRegisterPage);
router.route("/login").get(getLoginPage);
router.route("/logout").get(getLogout);
router.route("/contact").get(getContactPage);
router.route("/contact").post(sendMail);

export default router;