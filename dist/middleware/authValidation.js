import { body } from "express-validator";
import { withValidationErrors } from "./validationMiddleware.js";
import User from "../models/UserModel.js";
import { BadRequestError } from "../errors/customErrors.js";
export const validateRegisterInput = withValidationErrors([
    body("name").notEmpty().withMessage("name is required"),
    body("lastName").notEmpty().withMessage("last name is required"),
    body("location").notEmpty().withMessage("location is required"),
    body("email")
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("invalid email format")
        .custom(async (email) => {
        const user = await User.findOne({ email });
        if (user)
            throw new BadRequestError('email already exist');
    }),
    body("password").notEmpty().withMessage("password is required").isLength({ min: 8 }).withMessage('password must be at least 8 characters long'),
]);
export const validateLoginInput = withValidationErrors([
    body('email').notEmpty().withMessage('email is required').isEmail().withMessage('invalid email format'),
    body("password").notEmpty().withMessage("password is required"),
]);
//# sourceMappingURL=authValidation.js.map