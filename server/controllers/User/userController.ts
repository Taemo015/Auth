import { NextFunction, Request, Response } from "express";
import ErrorsInterceptor from "../../errorsListener/ErrorsInterceptor";

import UserModel from "../../models/user_model";
import UserService from "../../service/User/UserService";
import { IUser } from "../../types/types";

class UserController implements IUser {
  userService: IUser;
  userModel: typeof UserModel;

  constructor(userService: IUser, userModel: typeof UserModel) {
    this.userService = userService;
    this.userModel = userModel;
  }

  async registration(request: Request, response: Response, next: NextFunction) {
    try {
      const { email, nickname, password } = request.body;
      const candidate = await this.userModel.findOne({ where: { email } });
      if (candidate) {
        next(
          ErrorsInterceptor.BadRequest(
            409,
            "Пользователь с таким email уже зарегистрирован"
          )
        );
        return;
      }
      const { user, tokens } = await this.userService.registration({
        email,
        nickname,
        password,
      });

      response.cookie("refreshToken", tokens.refreshToken, { httpOnly: true });
      return response.json({ user, tokens });
    } catch (e) {
      next(e);
    }
  }

  async login(request: Request, response: Response, next: NextFunction) {
    try {
      console.log(response);
      const { email, nickname, password } = request.body;
      const data = await this.userService.login({
        email,
        nickname,
        password,
      });
      if (data instanceof ErrorsInterceptor) {
        return response.json(data);
      }
      const { user, tokens } = data;

      response.cookie("refreshToken", tokens.refreshToken, { httpOnly: true });
      return response.json({ user, tokens });
    } catch (e) {
      next(e);
    }
  }

  async logout(_request: Request, response: Response, next: NextFunction) {
    try {
      response.clearCookie("refreshToken");
      return response.json({ message: "OK" });
    } catch (e) {
      next(e);
    }
  }

  async refresh(request: Request, response: Response, next: NextFunction) {
    try {
      const { refreshToken } = request.cookies;
      const refresh = await this.userService.refresh(refreshToken);
      if (!refresh) {
        return next(ErrorsInterceptor.BadRequest(400, "Некорректный запрос"));
      }
      response.cookie("refreshToken", refresh.refreshToken, { httpOnly: true });
      return response.json(refresh);
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController(new UserService(), UserModel);
