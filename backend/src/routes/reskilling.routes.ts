import { Router } from "express";
import { recommendReskilling } from "../controllers/reskilling.controller.js";

export const reskillingRoutes = Router();
reskillingRoutes.post("/", recommendReskilling);
