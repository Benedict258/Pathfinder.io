import { Router } from "express";
import { listOpportunities } from "../controllers/opportunities.controller.js";

export const opportunitiesRoutes = Router();
opportunitiesRoutes.get("/", listOpportunities);
