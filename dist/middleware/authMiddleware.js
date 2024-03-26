import { BadRequestError, UnauthenticatedError, UnauthorizedError, } from "../errors/customErrors.js";
import { verifyJWT, } from "../utils/tokenUtils.js";
const authenticateUser = (req, _, next) => {
    const { token } = req.cookies;
    if (!token)
        throw new UnauthenticatedError("authentication invalid");
    try {
        const { userId, role } = verifyJWT(token);
        const testUser = userId === "65ff6a70154d0f0d99ca397b";
        req.user = { userId, role, testUser };
        next();
    }
    catch (error) {
        throw new UnauthenticatedError("authentication invalid");
    }
};
export default authenticateUser;
export function authorizePermissions(...roles) {
    return function (req, _, next) {
        if (!roles.includes(req.user?.role))
            throw new UnauthorizedError("Unauthorized to access this route");
        next();
    };
}
export const checkForTestUser = (req, _, next) => {
    if (req.user?.testUser)
        throw new BadRequestError('Demo user. Read Only!');
    next();
};
//# sourceMappingURL=authMiddleware.js.map