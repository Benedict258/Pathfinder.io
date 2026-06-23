import { Router } from "express";
import { markNodeComplete, getProgress } from "../controllers/progress.controller.js";

export const progressRoutes = Router();
progressRoutes.post("/complete", markNodeComplete);
progressRoutes.get("/", getProgress);
