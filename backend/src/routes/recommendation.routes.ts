import { Router } from "express";
import { createRecommendation, chatRecommendation } from "../controllers/recommendation.controller.js";

export const recommendationRoutes = Router();

recommendationRoutes.post("/", createRecommendation);
recommendationRoutes.post("/chat", chatRecommendation);
