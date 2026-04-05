import type { Request, Response } from "express";
import { getWaitlistCount, incrementWaitlistCount } from "../store/memory.js";
import { logger } from "../utils/logger.js";
import { appendWaitlistEmailToSheet } from "../services/googleSheets.service.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitEmail(req: Request, res: Response): Promise<void> {
  const { email } = req.body as { email: string };

  if (!email || !EMAIL_RE.test(email)) {
    res.status(400).json({ success: false, message: "Invalid email address." });
    return;
  }

  const normalizedEmail = email.toLowerCase().trim();

  try {
    await appendWaitlistEmailToSheet(normalizedEmail);
  } catch (error) {
    logger.error("Failed to append waitlist email to Google Sheets.", error);
    res.status(502).json({
      success: false,
      message: "Unable to save right now. Please try again.",
    });
    return;
  }

  incrementWaitlistCount();

  res.status(201).json({
    success: true,
    message: "You're on the list!",
  });
}

export function getCount(_req: Request, res: Response): void {
  res.status(200).json({ count: getWaitlistCount() });
}
