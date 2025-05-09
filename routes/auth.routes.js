import { Router } from "express";
import { registerUserController, loginUserController, logoutUserController } from "../controllers/auth.controller.js";

const router = Router();

// console.log("Routes loaded");

router.route("/register")
.post(registerUserController);

router.route("/login")
.post(loginUserController);

router.route("/logout")
.get(logoutUserController);


export default router;
