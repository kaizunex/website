import type { Request, Response } from "express";
import { addContact } from "../store/memory.js";
import { appendContactToSheet } from "../services/googleSheets.service.js";
import { logger } from "../utils/logger.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContact(req: Request, res: Response): Promise<void> {
  const { name, email, message } = req.body as {
    name: string;
    email: string;
    message: string;
  };

  if (!name || !email || !message) {
    res.status(400).json({ success: false, message: "All fields are required." });
    return;
  }

  if (!EMAIL_RE.test(email)) {
    res.status(400).json({ success: false, message: "Invalid email address." });
    return;
  }

  const contact = {
    name: name.trim(),
    email: email.toLowerCase().trim(),
    message: message.trim(),
  };

  addContact(contact.name, contact.email, contact.message);

  try {
    await appendContactToSheet(contact);
  } catch (error) {
    logger.error("Failed to append contact form submission to Google Sheets.", error);
    res.status(502).json({
      success: false,
      message: "Unable to submit right now. Please try again.",
    });
    return;
  }

  res.status(201).json({
    success: true,
    message: "Thank you for reaching out! We'll get back to you soon.",
  });
}
