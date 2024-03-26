import mongoose from "mongoose";
import { USER_ROLE } from "../utils/constants.js";

interface UserModelType {
  name: string;
  email: string;
  password: string;
  location: string;
  lastName: string;
  role: USER_ROLE;
  avatar: string;
  avatarPublicId: string
};


export type UserType = Omit<UserModelType, "password">;

export type CreatedUserType = UserType & {
  _id: string, 
  updatedAt: Date,
  createdAt: Date
}


const UserSchema = new mongoose.Schema<UserModelType>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
  location: {
    type: String,
    default: "my city",
  },
  lastName: {
    type: String,
    default: "lastName",
  },
  role: {
    type: String,
    enum: Object.values(USER_ROLE),
    default: USER_ROLE.USER,
  },
  avatar: {
    type: String
  },
  avatarPublicId: {
    type: String
  }
});

UserSchema.methods.toJSON = function () {
  let obj = this.toObject()
  delete obj.password
  return obj
}


export default mongoose.model<UserModelType>("User", UserSchema);
