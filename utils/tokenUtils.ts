import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import 'dotenv/config'

export type createJWTType = {
    userId: Types.ObjectId,
    role: string
}

export const createJWT = (payload: createJWTType) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return token;
};


export interface JwtPayloadExtended extends jwt.JwtPayload {
    userId: string,
    role: string
  }
  

export const verifyJWT = (token:string):JwtPayloadExtended | string => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayloadExtended
    return decoded
}