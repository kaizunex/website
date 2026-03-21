import type { Request, Response, NextFunction } from "express";

export function validateBody(requiredFields: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.body || typeof req.body !== "object") {
      res.status(400).json({
        success: false,
        message: "Request body is required.",
      });
      return;
    }

    const missing: string[] = [];
    for (const field of requiredFields) {
      const value = (req.body as Record<string, unknown>)[field];
      if (typeof value !== "string" || value.trim().length === 0) {
        missing.push(field);
      }
    }

    if (missing.length > 0) {
      res.status(400).json({
        success: false,
        message: `Missing or empty required fields: ${missing.join(", ")}`,
      });
      return;
    }

    next();
  };
}
