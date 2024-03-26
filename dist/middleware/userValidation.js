import { body } from "express-validator";
import { withValidationErrors } from "./validationMiddleware.js";
import User from "../models/UserModel.js";
import { BadRequestError } from "../errors/customErrors.js";
export const validateUpdateUserInput = withValidationErrors([
    body("name").notEmpty().withMessage("name is required"),
    body("email")
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("invalid email format")
        .custom(async (email, { req }) => {
        const user = await User.findOne({ email });
        if (user && user._id.toString() !== req.user.userId)
            throw new BadRequestError("email already exist");
    }),
    body("lastName").notEmpty().withMessage("last name is required"),
    body("location").notEmpty().withMessage("location is required"),
]);
//# sourceMappingURL=userValidation.js.map