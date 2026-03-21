import { Router } from "express";
import { submitContact } from "../controllers/contact.controller.js";
import { validateBody } from "../middleware/validateBody.js";

const router = Router();

router.post("/", validateBody(["name", "email", "message"]), submitContact);

export default router;
