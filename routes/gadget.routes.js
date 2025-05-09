import { Router } from "express";
import { createGadgetController, deleteGadgetController, getAllGadgetsController, getGadgetByStatusController, selfDestructGadgetController, updateGadgetController } from "../controllers/gadget.controller.js";
import { verifyJwtMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

// console.log("Routes loaded :11");

router.use(verifyJwtMiddleware);


router.route("/")
.get(getAllGadgetsController);

router.route("/create")
.post(createGadgetController);

router.route("/:id")
.patch(updateGadgetController)
.delete(deleteGadgetController);

router.route("/:id/self-destruct")
.post(selfDestructGadgetController);

router.route("/get-by-status")
.get(getGadgetByStatusController);



export default router;
