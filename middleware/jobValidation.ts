import { body, param } from "express-validator";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import mongoose from "mongoose";
import Job from "../models/JobModel.js";
import { withValidationErrors } from "./validationMiddleware.js";
import {
    BadRequestError,
    NotFoundError,
    UnauthorizedError,
} from "../errors/customErrors.js";

export const validateJobInput = withValidationErrors([
    body("company").notEmpty().withMessage("company is required"),
    body("position").notEmpty().withMessage("position is required"),
    body("jobLocation").notEmpty().withMessage("job location is required"),
    body("jobStatus")
        .isIn(Object.values(JOB_STATUS))
        .withMessage("invalid status value"),
    body("jobType")
        .isIn(Object.values(JOB_TYPE))
        .withMessage("invalid type value"),
]);

export const validateIdParam = withValidationErrors([
    param("id").custom(async (value, { req }) => {
        const isValidId = mongoose.Types.ObjectId.isValid(value);
        if (!isValidId) throw new BadRequestError("invalid mongoDB id");
        const job = await Job.findById(value);
        if (!job) throw new NotFoundError(`no job with id ${value}`);
        const isAdmin = req.user.role === "admin";
        const isOwner = req.user.userId === job.createdBy.toString();
        if (!isAdmin && !isOwner)
            throw new UnauthorizedError("not authorized to access this route");
    }),
]);
