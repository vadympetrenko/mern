import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import {v2 as cloudinary} from 'cloudinary'


// public
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// routers
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

// middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import authenticateUser from "./middleware/authMiddleware.js";
import helmet from "helmet";
import ExpressMongoSanitize from "express-mongo-sanitize";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(helmet())
app.use(ExpressMongoSanitize())

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, "../client/dist/")));

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/auth", authRouter);

app.use("*", (_, res) => {
   res.sendFile(path.resolve(__dirname, '../client/dist/', 'index.html'))
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
    await mongoose.connect(process.env.MONGO_URL!);
    app.listen(port, () => {
        console.log(`server is running on PORT ${port}`);
    });
} catch (error) {
    console.log(error);
    process.exit(1);
}
