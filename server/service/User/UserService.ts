import bcrypt from "bcryptjs";

import UserModel from "../../models/user_model";
import Role from "../..//models/user_roles";
import TokenService from "../Token/TokenService";
import { IUser, UserData } from "../../types/types";
import ErrorsInterceptor from "../..//errorsListener/ErrorsInterceptor";

export default class UserService implements IUser {
  async registration({ email, nickname, password }: UserData) {
    const hashPass = await bcrypt.hash(password, 5);
    const tokens = TokenService.generateTokens({ email, nickname });
    const user = new UserModel({
      email,
      nickname,
      password: hashPass,
    });

    await user.save();

    const roles = new Role({ roles: ["ADMIN"], user_id: user.id });
    await roles.save();

    return { user, tokens };
  }

  async login({ email, nickname, password }: UserData) {
    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      return ErrorsInterceptor.BadRequest(409, "Неверные данные");
    }
    const comparePass = await bcrypt.compare(password, user.password);
    if (!comparePass) {
      return ErrorsInterceptor.BadRequest(409, "Неверные данные");
    }
    const tokens = TokenService.generateTokens({ email, nickname });

    return { user, tokens };
  }

  async logout() {}

  async refresh(refreshToken: string) {
    const userData = TokenService.validRefreshToken(refreshToken);
    if (userData) {
      const { email, nickname } = userData;
      const tokens = TokenService.generateTokens({ email, nickname });
      return tokens;
    }
    return null;
  }
}
