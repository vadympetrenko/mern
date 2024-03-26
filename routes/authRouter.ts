import { Router } from "express";
import { login, logout, regiser } from "../controllers/authController.js";
import {
    validateLoginInput,
    validateRegisterInput,
} from "../middleware/authValidation.js";
import { ValidationChain } from "express-validator";
import rateLimit from "express-rate-limit";

const apiLimiter = rateLimit({
    windowMs: 16 * 60 * 1000,
    max: 15,
    message: 'IP rate limit exceeded, retry in 15 minutes'
})



const router = Router();

router.post("/login", apiLimiter, validateLoginInput as ValidationChain[], login);
router.post("/register", apiLimiter ,validateRegisterInput as ValidationChain[], regiser);
router.get("/logout", logout);

export default router;
