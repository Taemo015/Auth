import { NextFunction, Request, Response } from "express";
import ErrorsInterceptor from "../../errorsListener/ErrorsInterceptor";

class UserController {
  async getUser(request: Request, response: Response, next: NextFunction) {
    try {
    } catch (e) {
      next(e);
    }
  }

  async editUser(_request: Request, response: Response, next: NextFunction) {
    try {
    } catch (e) {
      next(e);
    }
  }

  async deleteUser(request: Request, response: Response, next: NextFunction) {
    try {
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();
