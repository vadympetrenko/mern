import { StatusCodes } from "http-status-codes";

export type NotFoundErrorType = Error & {
  statusCode: StatusCodes;
};

export class NotFoundError extends Error {
  statusCode: StatusCodes;

  constructor(message: string) {
    super(message as string);
    this.name = "NotFoundError";
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export class BadRequestError extends Error {
  statusCode: StatusCodes;

  constructor(message: string | string[]) {
    super(message as string);
    this.name = "BadRequestError";
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export class UnauthenticatedError extends Error {
  statusCode: StatusCodes;

  constructor(message: string) {
    super(message as string);
    this.name = "UnauthenticatedError";
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export class UnauthorizedError extends Error {
  statusCode: StatusCodes;

  constructor(message: string) {
    super(message as string);
    this.name = "ForbitterError";
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}


