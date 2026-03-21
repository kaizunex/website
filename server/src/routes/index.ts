import { Router } from "express";
import waitlistRoutes from "./waitlist.routes.js";
import contactRoutes from "./contact.routes.js";
import analyticsRoutes from "./analytics.routes.js";
import { checkHealth } from "../controllers/health.controller.js";

const router = Router();

router.use("/api/waitlist", waitlistRoutes);
router.use("/api/contact", contactRoutes);
router.use("/api/analytics", analyticsRoutes);
router.get("/api/health", checkHealth);

export default router;
