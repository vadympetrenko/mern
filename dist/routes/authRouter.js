import { Router } from "express";
import { login, logout, regiser } from "../controllers/authController.js";
import { validateLoginInput, validateRegisterInput, } from "../middleware/authValidation.js";
const router = Router();
router.post("/login", validateLoginInput, login);
router.post("/register", validateRegisterInput, regiser);
router.get("/logout", logout);
export default router;
//# sourceMappingURL=authRouter.js.map