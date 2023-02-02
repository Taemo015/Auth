import { NextFunction, Request, Response } from "express";
import ErrorsInterceptor from "../../errorsListener/ErrorsInterceptor";

import AuthService from "./AuthService";
import { IAuth } from "./types";

class AuthControllers implements IAuth {
  async registration(request: Request, response: Response, next: NextFunction) {
    try {
      const data = request.body;
      if (!data) {
        return next(ErrorsInterceptor.ServerError());
      }
      const result = await AuthService.registration(data);
      if (result instanceof ErrorsInterceptor) {
        return next(result);
      }
      const { tokens } = result;
      response.cookie("refreshToken", tokens.refreshToken, { httpOnly: true });
      return response.json(result);
    } catch (e) {
      next(e);
    }
  }

  async login(request: Request, response: Response, next: NextFunction) {
    try {
      const data = request.body;
      if (!data) {
        return next(ErrorsInterceptor.ServerError());
      }
      const result = await AuthService.login(data);
      if (result instanceof ErrorsInterceptor) {
        return next(result);
      }
      const { tokens } = result;
      response.cookie("refreshToken", tokens.refreshToken, { httpOnly: true });
      return response.json(result);
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

  async account(request: Request, response: Response, next: NextFunction) {
    try {
      //@ts-ignore
      const data = request.dataUser;
      const result = await AuthService.account(data);
      if (result instanceof ErrorsInterceptor) {
        return next(result);
      }
      const { tokens } = result;
      response.cookie("refreshToken", tokens.refreshToken, { httpOnly: true });
      return response.json(result);
    } catch (e) {
      next(e);
    }
  }
}

export default new AuthControllers();
