import { Gadget } from "../models/gadget.model.js";
import { Op } from "sequelize";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getAllGadgetsController = asyncHandler(async(req, res) => {
    const gadgets = await Gadget.findAll();
    const enrichedForm = gadgets.map(g => ({
        ...g.toJSON(),
        successProbability : `${Math.floor(Math.random() * 100)}%`,
    }));
    return res.status(200)
    .json(
        new ApiResponse(
            200,
            enrichedForm,
            "Successfully fetched all gadgets"
        )
    )
});

const createGadgetController = asyncHandler(async(req, res) => {
    const { name } = req.query;
    const codeName = `The-${Math.random().toString(36).substring(7)}`;
    const gadget = await Gadget.create({ name, codeName });
    return res.status(201)
    .json(
        new ApiResponse(
            201,
            gadget,
            "Successfully created a new gadget"
        )
    );
})

const updateGadgetController = asyncHandler(async(req, res) => {
    const { id } = req.params;
    if(!id){
        throw new ApiError(404, "Gadget Id not provided");
    }
    const gadget = await Gadget.findByPk(id);
    if(!gadget){
        throw new ApiError(404, "Gadget Not found");
    }
    const updatedGadget = await gadget.update(req.body);
    return res.status(200)
    .json(
        new ApiResponse(
            200,
            updatedGadget,
            "Gadget updated successfully"
        )
    );
})

const deleteGadgetController = asyncHandler(async(req, res) => {
    const { id } = req.params;
    if(!id){
        throw new ApiError(400, "Gadget Id is required");
    }
    const gadget = await Gadget.findByPk(id);
    if(!gadget){
        throw new ApiError(404, "Gadget not found");
    }

    const deletedGadget = await gadget.update({
        status : "Decommissioned",
        deCommissionedAt : new Date()
    });
    return res.status(200)
    .json(
        new ApiResponse(
            200,
            deletedGadget,
            "Successfully decommissioned the gadget"
        )
    );
})

const selfDestructGadgetController = asyncHandler(async(req, res) => {
    const { id } = req.params;
    if(!id){
        throw new ApiError(400, "Gadget Id not found");
    }
    const gadget = await Gadget.findByPk(id);
    if(!gadget){
        throw new ApiError(404, "Gadget not found");
    }
    const confirmationCode = Math.floor(100000 + Math.random() * 900000);
    const destructedGadget = await gadget.update({ status : "Destroyed" });
    return res.status(200)
    .json(
        new ApiResponse(
            200,
            destructedGadget,
            "Successfully initiated self-destruct"
        )
    )
})

export { 
    getAllGadgetsController,
    createGadgetController,
    updateGadgetController,
    deleteGadgetController,
    selfDestructGadgetController
}