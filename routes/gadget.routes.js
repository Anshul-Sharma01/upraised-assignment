import { Router } from "express";
import { createGadgetController, deleteGadgetController, getAllGadgetsController, selfDestructGadgetController, updateGadgetController } from "../controllers/gadget.controller.js";
import { verifyJwtMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

// console.log("Routes loaded :11");

router.use(verifyJwtMiddleware);


router.route("/")
.get(getAllGadgetsController)
.post(createGadgetController);

router.route("/:id")
.patch(updateGadgetController)
.delete(deleteGadgetController);

router.route("/:id/self-destruct")
.post(selfDestructGadgetController);



export default router;
