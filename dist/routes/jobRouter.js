import { Router } from "express";
import { createJob, deleteJob, getAllJobs, getSingleJob, showStats, updateJob, } from "../controllers/jobController.js";
import { validateJobInput, validateIdParam } from "../middleware/jobValidation.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";
const router = Router();
router
    .route("/")
    .get(getAllJobs)
    .post(checkForTestUser, validateJobInput, createJob);
router.route('/stats').get(showStats);
router
    .route("/:id")
    .get(validateIdParam, getSingleJob)
    .patch(checkForTestUser, validateJobInput, validateIdParam, updateJob)
    .delete(checkForTestUser, validateIdParam, deleteJob);
export default router;
//# sourceMappingURL=jobRouter.js.map