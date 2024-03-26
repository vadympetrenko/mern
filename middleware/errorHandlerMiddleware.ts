import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { NotFoundErrorType } from "../errors/customErrors.js";

const errorHandlerMiddleware = (
  err: NotFoundErrorType,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const msg = err.message || "Something went wrong, try again later";
  res.status(statusCode).json(msg);
};

export default errorHandlerMiddleware;
