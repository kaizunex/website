import { Router } from "express";
import { trackEvent, getSummary } from "../controllers/analytics.controller.js";
import { validateBody } from "../middleware/validateBody.js";

const router = Router();

router.post("/event", validateBody(["event"]), trackEvent);
router.get("/summary", getSummary);

export default router;
