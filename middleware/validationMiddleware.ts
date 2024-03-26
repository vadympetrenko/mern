import {
    ValidationChain,
    validationResult,
} from "express-validator";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../errors/customErrors.js";
import { NextFunction, Request, Response } from "express";

export const withValidationErrors = (validateValues: ValidationChain[]) => {
    return [
        validateValues,
        (req: Request, res: Response, next: NextFunction) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorMessages: string[] = errors
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

