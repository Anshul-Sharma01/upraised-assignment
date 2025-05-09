import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const checkServerHealthController = asyncHandler(async (req, res) => {
    const routes = {
        auth: {
            register: "/api/v1/auth/register",
            login: "/api/v1/auth/login",
            logout : "/api/v1/auth/logout"
        },
        gadgets: {
            getAll: "/api/v1/gadgets (GET)",
            create: "/api/v1/gadgets (POST)",
            update: "/api/v1/gadgets/:id (PATCH)",
            delete: "/api/v1/gadgets/:id (DELETE)",
            selfDestruct: "/api/v1/gadgets/:id/self-destruct (POST)",
            filterByStatus: "/api/v1/gadgets/get-by-status?status={sttus} (GET)"
        }
    };

    return res.status(200).json(
        new ApiResponse(
            200,
            { routes },
            "🫡Server is up and running Sergent! Explore the available routes, ghost over and out."
        )
    );
});


export {
    checkServerHealthController
};