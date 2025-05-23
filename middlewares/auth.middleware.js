import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";



export const verifyJwtMiddleware = asyncHandler(async(req, res, next) => {
    try {
        const token = req.cookies?.jwtToken || req.header("Authorization")?.replace("Bearer ", "").trim();
        if(!token){
            throw new ApiError(401, "No token provided"); 
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (error) {
        if(error.statusCode === 401){
            throw new ApiError(401, "Unauthenticated request");
        }
        throw new ApiError(400, "Error occurred at backend");
    }
})
