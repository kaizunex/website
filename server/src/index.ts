import "dotenv/config";
import express from "express";
import cors from "cors";
import { logger } from "./utils/logger.js";
import { createRateLimiter } from "./middleware/rateLimiter.js";
import routes from "./routes/index.js";

const app = express();
const PORT = Number(process.env["PORT"]) || 2000;

app.use(
  cors({
    origin: process.env["FRONTEND_URL"] || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(createRateLimiter());
app.use(routes);

app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
  logger.info(`Environment: ${process.env["NODE_ENV"] ?? "development"}`);
});
