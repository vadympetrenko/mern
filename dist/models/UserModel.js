import mongoose from "mongoose";
import { USER_ROLE } from "../utils/constants.js";
;
const UserSchema = new mongoose.Schema({
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
    let obj = this.toObject();
    delete obj.password;
    return obj;
};
export default mongoose.model("User", UserSchema);
//# sourceMappingURL=UserModel.js.map