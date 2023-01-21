import { NextFunction, Request, Response } from "express";
import ErrorsInterceptor from "../../errorsListener/ErrorsInterceptor";

import AuthService from "./AuthService";
import { IAuth } from "./types";

class AuthControllers implements IAuth {
  async registration(request: Request, response: Response, next: NextFunction) {
    try {
      const data = request.body;
      if (!data) {
        return next(ErrorsInterceptor.BadRequest(500, "Internal Server Error"));
      }
      const result = await AuthService.registration(data);
      if (result instanceof ErrorsInterceptor) {
        return next(result);
      }
      return response.json(result);
    } catch (e) {
      next(e);
    }
  }

  async login(request: Request, response: Response, next: NextFunction) {
    try {
    } catch (e) {
      next(e);
    }
  }

  async logout(_request: Request, response: Response, next: NextFunction) {
    try {
    } catch (e) {
      next(e);
    }
  }
}

export default new AuthControllers();
