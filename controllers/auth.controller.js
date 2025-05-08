import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const generateJwtToken = (user) => {
    const token = jwt.sign({ id : user.id }, process.env.JWT_SECRET);
    return token;
}

const cookieOptions = {
    maxAge : 7 * 24 * 60 * 60 * 1000,
    secure : true,
    httpOnly : true,
}


const registerUserController = asyncHandler(async(req, res) => {
    const { username, password } = req.body;
    if(!username || !password){
        throw new ApiError(400, "All Fields are mandatory");
    }

    const user = await User.create({ 
        username,
        password
    });

    const jwtToken = generateJwtToken();
    return res.status(201)
    .cookie("jwtToken", jwtToken, cookieOptions)
    .json(
        new ApiResponse(
            201,
            user,
            "User Successfully registered"
        )
    );
})

const loginUserController = asyncHandler(async(req, res) => {
    const { username, password } = req.body;
    if(!username || !password){
        throw new ApiError(400, "All fields are mandatory");
    }
    const user = await User.findOne({ where : { username } });
    if(!user || !(await bcrypt.compare(password, user.password))){
        throw new ApiError(400, "Invalid Credentials");
    }
    const token = generateJwtToken();
    return res.status(200)
    .cookie("jwtToken", token, cookieOptions)
    .json(
        new ApiResponse(
            200,
            user,
            "Authentication Successfully"
        )
    )
})


export { 
    registerUserController,
    loginUserController
}