import { NextFunction, Request, Response } from "express";
import {
    BadRequestError,
    UnauthenticatedError,
    UnauthorizedError,
} from "../errors/customErrors.js";
import {
    JwtPayloadExtended,
    verifyJWT,
} from "../utils/tokenUtils.js";

export interface AuthenticatedRequest extends Request {
    user?: user;
}

export interface user {
    userId: string;
    role: string;
    testUser: boolean;
}

const authenticateUser = (
    req: AuthenticatedRequest,
    _: Response,
    next: NextFunction
) => {
    const { token } = req.cookies;
    if (!token) throw new UnauthenticatedError("authentication invalid");

    try {
        const { userId, role }: JwtPayloadExtended = verifyJWT(
            token
        ) as JwtPayloadExtended;
        const testUser = userId === "65ff6a70154d0f0d99ca397b";
        req.user = { userId, role, testUser };
        next();
    } catch (error) {
        throw new UnauthenticatedError("authentication invalid");
    }
};

export default authenticateUser;

export function authorizePermissions(...roles: string[]) {
    return function (
        req: AuthenticatedRequest,
        _: Response,
        next: NextFunction
    ) {
        if (!roles.includes(req.user?.role!))
            throw new UnauthorizedError("Unauthorized to access this route");
        next();
    };
}

export const checkForTestUser = (
    req: AuthenticatedRequest,
    _: Response,
    next: NextFunction
) => {
    if(req.user?.testUser) throw new BadRequestError('Demo user. Read Only!')
    next()
};
