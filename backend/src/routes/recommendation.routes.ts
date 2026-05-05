import { Router } from "express";
import { createRecommendation } from "../controllers/recommendation.controller.js";

export const recommendationRoutes = Router();

recommendationRoutes.post("/", createRecommendation);
