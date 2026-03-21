import type { Request, Response } from "express";
import {
  addWaitlistEntry,
  confirmWaitlistEntry,
  getWaitlistCount,
} from "../store/memory.js";
import { logger } from "../utils/logger.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function submitEmail(req: Request, res: Response): void {
  const { email } = req.body as { email: string };

  if (!email || !EMAIL_RE.test(email)) {
    res.status(400).json({ success: false, message: "Invalid email address." });
    return;
  }

  const code = String(Math.floor(100_000 + Math.random() * 900_000));
  const { exists } = addWaitlistEntry(email.toLowerCase().trim(), code);

  if (exists) {
    res.status(409).json({ success: false, message: "Email already confirmed." });
    return;
  }

  logger.info(`Confirmation code for ${email}: ${code}`);

  res.status(201).json({
    success: true,
    message: "Check your inbox for a confirmation code.",
    ...(process.env["NODE_ENV"] === "development" && { code }),
  });
}

export function confirmEmail(req: Request, res: Response): void {
  const { email, code } = req.body as { email: string; code: string };

  if (!email || !code) {
    res.status(400).json({ success: false, message: "Email and code are required." });
    return;
  }

  const ok = confirmWaitlistEntry(email.toLowerCase().trim(), code);

  if (!ok) {
    res.status(400).json({ success: false, message: "Invalid email or code." });
    return;
  }

  res.status(200).json({ success: true, message: "Email confirmed! You're on the waitlist." });
}

export function getCount(_req: Request, res: Response): void {
  res.status(200).json({ count: getWaitlistCount() });
}
