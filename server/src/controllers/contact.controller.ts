import type { Request, Response } from "express";
import { addContact } from "../store/memory.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function submitContact(req: Request, res: Response): void {
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

  addContact(name.trim(), email.toLowerCase().trim(), message.trim());

  res.status(201).json({
    success: true,
    message: "Thank you for reaching out! We'll get back to you soon.",
  });
}
