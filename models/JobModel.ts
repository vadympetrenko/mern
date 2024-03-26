import mongoose, { Schema } from "mongoose";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";

interface JobSchemaType {
  company: string;
  position: string;
  jobStatus: JOB_STATUS;
  jobType: JOB_TYPE;
  jobLocation: string;
  createdBy: mongoose.Types.ObjectId
};

export type JobType = JobSchemaType & {
  _id: string, 
  updatedAt: Date,
  createdAt: Date
}


const JobSchema = new mongoose.Schema<JobSchemaType>(
  {
    company: {
      type: String,
      required: true
    },
    position: {
      type: String,
      required: true
    },
    jobStatus: {
      type: String,
      enum: Object.values(JOB_STATUS),
      default: JOB_STATUS.PENDING,
    },
    jobType: {
      type: String,
      enum: Object.values(JOB_TYPE),
      default: JOB_TYPE.FULL_TIME,
    },
    jobLocation: {
      type: String,
      default: "my city",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

export default mongoose.model<JobSchemaType>("Job", JobSchema);
