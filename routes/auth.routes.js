import { Router } from "express";
import { registerUserController, loginUserController } from "../controllers/auth.controller.js";

const router = Router();

router.route("/register")
.post(registerUserController);

router.route("/login")
.post(loginUserController);


export default router;
