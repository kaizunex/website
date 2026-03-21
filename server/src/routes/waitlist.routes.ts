import { Router } from "express";
import { submitEmail, confirmEmail, getCount } from "../controllers/waitlist.controller.js";
import { validateBody } from "../middleware/validateBody.js";

const router = Router();

router.post("/", validateBody(["email"]), submitEmail);
router.post("/confirm", validateBody(["email", "code"]), confirmEmail);
router.get("/count", getCount);

export default router;
