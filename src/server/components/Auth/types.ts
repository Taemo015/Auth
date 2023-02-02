import { Request, Response, NextFunction } from "express";
export type DataRequestName = "email" | "nickname" | "password";

export enum Endpoint {
  registration = "/registration",
  login = "/login",
  logout = "/logout",
  account = "/account",
}

export type IAuth = {
  [P in keyof typeof Endpoint]: (
    request: Request,
    response: Response,
    next: NextFunction
  ) => Promise<unknown>;
};
