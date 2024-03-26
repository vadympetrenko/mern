import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import Job from "../models/JobModel.js";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/authMiddleware.js";
import cloudinary from 'cloudinary'
import { formatImage } from "../middleware/multerMiddleware.js";

export const getCurrentUser = async (req: AuthenticatedRequest, res: Response) => {
    const user = await User.findOne({_id: req.user?.userId})
    const userWithoutPassword = user?.toJSON()
    res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const getApplicationStats = async (req: Request, res: Response) => {
    const users = await User.countDocuments()
    const jobs = await Job.countDocuments()
    res.status(StatusCodes.OK).json({ users, jobs });
};

export const updateUser = async (req: AuthenticatedRequest, res: Response) => {
 
    const newUser = {...req.body}
    delete newUser.password;

    if(req.file) {
        const file = formatImage(req.file)
        const response = await cloudinary.v2.uploader.upload(file!)
        newUser.avatar = response.secure_url
        newUser.avatarPublicId = response.public_id
    }
    const updatedUser = await User.findByIdAndUpdate(req.user?.userId, newUser)

    if(req.file && updatedUser?.avatarPublicId) {
        await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId)
    }

    res.status(StatusCodes.OK).json({ msg: "user updated" });
};
