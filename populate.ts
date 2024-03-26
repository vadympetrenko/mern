import { readFile } from 'fs/promises';
import mongoose from 'mongoose';
import 'dotenv/config';

import Job, { JobType } from './models/JobModel.js';
import User, { CreatedUserType } from './models/UserModel.js';
try {
  await mongoose.connect(process.env.MONGO_URL!);
  const user = await User.findOne({ email: 'john@gmail.com' })  as CreatedUserType;
//   const user = await User.findOne({ email: 'test@test.com' }) as CreatedUserType;

  const jsonJobs = JSON.parse(
    await readFile(new URL('./utils/mockData.json', import.meta.url), 'utf-8')
  );
  const jobs = jsonJobs.map((job: JobType) => {
    return { ...job, createdBy: user._id };
  });
  await Job.deleteMany({ createdBy: user._id });
  await Job.create(jobs);
  console.log('Success!!!');
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}