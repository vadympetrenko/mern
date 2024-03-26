import { Router } from "express";
import {
    createJob,
    deleteJob,
    getAllJobs,
    getSingleJob,
    showStats,
    updateJob,
} from "../controllers/jobController.js";
import { validateJobInput, validateIdParam } from "../middleware/jobValidation.js";
import { ValidationChain } from "express-validator";
import { checkForTestUser } from "../middleware/authMiddleware.js";

const router = Router();

router
    .route("/")
    .get(getAllJobs)
    .post(checkForTestUser, validateJobInput as ValidationChain[], createJob);

router.route('/stats').get(showStats)

router
    .route("/:id")
    .get(validateIdParam as ValidationChain[], getSingleJob)
    .patch(
        checkForTestUser,
        validateJobInput as ValidationChain[],
        validateIdParam as ValidationChain[],
        updateJob
    )
    .delete(checkForTestUser, validateIdParam as ValidationChain[], deleteJob);

export default router;
