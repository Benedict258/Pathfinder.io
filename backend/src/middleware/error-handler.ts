import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof ZodError) {
    res.status(400).json({
      message: "Validation failed",
      issues: process.env.NODE_ENV === "development" ? error.issues : undefined,
    });
    return;
  }

  console.error(error);

  res.status(500).json({
    message: process.env.NODE_ENV === "development" ? error.message : "Something went wrong"
  });
};
