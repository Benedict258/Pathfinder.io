import { Router } from "express";
import { recommendByField } from "../controllers/field-study.controller.js";

export const fieldStudyRoutes = Router();
fieldStudyRoutes.post("/", recommendByField);
