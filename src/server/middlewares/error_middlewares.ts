import { NextFunction, Request, Response } from "express";
import ErrorsInterceptor from "../errorsListener/ErrorsInterceptor";

export default (error: ErrorsInterceptor, _request: Request, response: Response, _next: NextFunction) => {
  if (error instanceof ErrorsInterceptor) {
    return response.status(error.status).json({ message: error.message });
  }
  return response.status(500).json({ message: "Internal Server Error" });
};
