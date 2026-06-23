import cors from "cors";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { env } from "./config/env.js";
import { errorHandler } from "./middleware/error-handler.js";
import { healthRoutes } from "./routes/health.routes.js";
import { recommendationRoutes } from "./routes/recommendation.routes.js";
import { roadmapRoutes } from "./routes/roadmap.routes.js";
import { authRoutes } from "./routes/auth.routes.js";
import { fieldStudyRoutes } from "./routes/field-study.routes.js";
import { reskillingRoutes } from "./routes/reskilling.routes.js";
import { opportunitiesRoutes } from "./routes/opportunities.routes.js";
import { progressRoutes } from "./routes/progress.routes.js";

export const app = express();

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", process.env.FRONTEND_URL || "http://localhost:3000"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));
app.use(
  cors({
    origin: env.FRONTEND_URL
  })
);
app.use(express.json());

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests, please try again later." }
});
app.use(limiter);

const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many auth attempts, please try again later." }
});

app.use("/api/health", healthRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/roadmaps", roadmapRoutes);
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/field-study", fieldStudyRoutes);
app.use("/api/reskilling", reskillingRoutes);
app.use("/api/opportunities", opportunitiesRoutes);
app.use("/api/progress", progressRoutes);

app.use(errorHandler);
