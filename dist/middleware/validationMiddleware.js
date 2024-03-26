import { validationResult, } from "express-validator";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../errors/customErrors.js";
export const withValidationErrors = (validateValues) => {
    return [
        validateValues,
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorMessages = errors
                    .array()
                    .map((error) => error.msg);
                if (errorMessages[0].startsWith("no job"))
                    throw new NotFoundError(errorMessages[0]);
                if (errorMessages[0].startsWith("not authorized"))
                    throw new UnauthorizedError(errorMessages[0]);
                throw new BadRequestError(errorMessages);
            }
            next();
        },
    ];
};
//# sourceMappingURL=validationMiddleware.js.map