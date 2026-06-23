import { Router } from "express";
import { signup, getMe } from "../controllers/auth.controller.js";

export const authRoutes = Router();
authRoutes.post("/signup", signup);
authRoutes.get("/me", getMe);
