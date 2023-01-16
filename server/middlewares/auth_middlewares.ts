import { NextFunction, Request, Response } from "express";
import ErrorsInterceptor from "../errorsListener/ErrorsInterceptor";
import TokenService from "../service/Token/TokenService";

export default function (request: Request, _: Response, next: NextFunction) {
  try {
    const authorizationHeader = request.headers.authorization;
    if (!authorizationHeader) {
      return next(ErrorsInterceptor.UnAuthorized());
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(ErrorsInterceptor.UnAuthorized());
    }

    const dataUser = TokenService.validAccessToken(accessToken);
    if (!dataUser) {
      return next(ErrorsInterceptor.UnAuthorized());
    }
    next();
  } catch (e) {
    next(e);
  }
}
