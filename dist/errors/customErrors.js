import { StatusCodes } from "http-status-codes";
export class NotFoundError extends Error {
    statusCode;
    constructor(message) {
        super(message);
        this.name = "NotFoundError";
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}
export class BadRequestError extends Error {
    statusCode;
    constructor(message) {
        super(message);
        this.name = "BadRequestError";
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}
export class UnauthenticatedError extends Error {
    statusCode;
    constructor(message) {
        super(message);
        this.name = "UnauthenticatedError";
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}
export class UnauthorizedError extends Error {
    statusCode;
    constructor(message) {
        super(message);
        this.name = "ForbitterError";
        this.statusCode = StatusCodes.FORBIDDEN;
    }
}
//# sourceMappingURL=customErrors.js.map