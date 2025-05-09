import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config({ path : "./.env" });


const app = express();


app.use(express.json());
app.use(cookieParser());


// Import routes
import authRouter from "./routes/auth.routes.js";
import gadgetRouter from "./routes/gadget.routes.js";
import { checkServerHealthController } from "./controllers/health.controller.js";

// app.use("/health", checkServerHealthController);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/gadgets", gadgetRouter);



app.use("/splat", (req, res) => {
    res.status(404)
    .json({
        success : false,
        message : "U got the wrong address !!!"
    })
})

export { app }
