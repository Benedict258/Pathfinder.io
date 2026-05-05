import cors from "cors";
import express from "express";
import helmet from "helmet";
import { env } from "./config/env.js";
import { errorHandler } from "./middleware/error-handler.js";
import { healthRoutes } from "./routes/health.routes.js";
import { recommendationRoutes } from "./routes/recommendation.routes.js";
import { roadmapRoutes } from "./routes/roadmap.routes.js";

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

app.use(errorHandler);
