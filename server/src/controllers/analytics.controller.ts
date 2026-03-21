import type { Request, Response } from "express";
import { addAnalyticsEvent, getAnalyticsSummary } from "../store/memory.js";

export function trackEvent(req: Request, res: Response): void {
  const { event, payload } = req.body as {
    event: string;
    payload?: Record<string, string>;
  };

  if (!event || typeof event !== "string") {
    res.status(400).json({ success: false, message: "Event name is required." });
    return;
  }

  addAnalyticsEvent(event, payload ?? {});

  res.status(200).json({ success: true });
}

export function getSummary(_req: Request, res: Response): void {
  res.status(200).json({ success: true, summary: getAnalyticsSummary() });
}
