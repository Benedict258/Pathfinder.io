import cors from "cors";
import express from "express";
import helmet from "helmet";
import { env } from "./config/env.js";
import { errorHandler } from "./middleware/error-handler.js";
import { healthRoutes } from "./routes/health.routes.js";
import { recommendationRoutes } from "./routes/recommendation.routes.js";
import { roadmapRoutes } from "./routes/roadmap.routes.js";
import { authRoutes } from "./routes/auth.routes.js";
import { fieldStudyRoutes } from "./routes/field-study.routes.js";
import { opportunitiesRoutes } from "./routes/opportunities.routes.js";
import { progressRoutes } from "./routes/progress.routes.js";

export const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.FRONTEND_URL
  })
);
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/roadmaps", roadmapRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/field-study", fieldStudyRoutes);
app.use("/api/opportunities", opportunitiesRoutes);
app.use("/api/progress", progressRoutes);

app.use(errorHandler);
