import { Router } from "express";
import { getRoadmapBySlug, listRoadmaps } from "../controllers/roadmap.controller.js";

export const roadmapRoutes = Router();

roadmapRoutes.get("/", listRoadmaps);
roadmapRoutes.get("/:slug", getRoadmapBySlug);
