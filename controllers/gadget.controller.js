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
    const { name } = req.body;
    const codename = `The-${Math.random().toString(36).substring(7)}`;
    const gadget = await Gadget.create({ name, codename });
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

// bonus api 
const getGadgetByStatusController = asyncHandler(async(req, res) => {
    const { status } = req.query;
    if(!status){
        throw new ApiError(400, "Status not provided");
    }
    
    const allowedStatuses = ["Available", "Deployed", "Destroyed", "Decommissioned"];

    if (!allowedStatuses.includes(status)) {
        throw new ApiError(400, `Invalid status. Allowed values are: ${allowedStatuses.join(", ")}`);
    }
    const gadgets = await Gadget.findAll({ where : { status } });
    if(gadgets.length === 0){
        return res.status(404)
        .json(
            new ApiResponse(
                404,
                {},
                "No gadget found for that particular status"
            )
        )
    }
    return res.status(200)
    .json(
        new ApiResponse(
            200,
            gadgets,
            "Successfully fetched the gadgets for specific status"
        )
    )
})


export { 
    getAllGadgetsController,
    createGadgetController,
    updateGadgetController,
    deleteGadgetController,
    selfDestructGadgetController,
    getGadgetByStatusController
}