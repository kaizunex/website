import { Router } from "express";
import { submitEmail, getCount } from "../controllers/waitlist.controller.js";
import { validateBody } from "../middleware/validateBody.js";

const router = Router();

router.post("/", validateBody(["email"]), submitEmail);
router.get("/count", getCount);

export default router;
