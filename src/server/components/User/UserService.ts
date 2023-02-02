import { Nullable } from "types";
import ErrorsInterceptor from "../../errorsListener/ErrorsInterceptor";
import TokenService from "../Tokens/TokenService";
import { DataRequest } from "../types";
import UserModel from "./UserModel";
import UserRoles from "./UserRoles";

export class UserService {
  async checkNickname(nickname: string) {
    const checkNickname = await UserModel.findOne({ where: { nickname } });
    return checkNickname ? checkNickname : undefined;
  }

  async findUserId(user_id: number) {
    const user = await UserModel.findOne({ where: { id: user_id } });
    return user ? user : undefined;
  }

  async createUser(data: DataRequest, auth_id: number) {
    try {
      const { email, nickname } = data;
      const tokens = TokenService.generateTokens({ email, nickname });
      const user = new UserModel({
        nickname,
        auth_id,
        refreshToken: tokens.refreshToken,
      });
      await user.save();

      const roles = new UserRoles({
        user_id: user.id,
        roles: ["ADMIN"],
      });
      await roles.save();

      return { user, tokens };
    } catch (e) {
      return ErrorsInterceptor.ServerError();
    }
  }

  async getUser(email: string, user_id: number) {
    try {
      const user = await this.findUserId(user_id);
      if (!user) {
        return ErrorsInterceptor.ServerError();
      }

      const tokens = TokenService.generateTokens({
        email,
        nickname: user.nickname,
      });
      user.refreshToken = tokens.refreshToken;
      await user.save();

      return { user, tokens };
    } catch (e) {
      return ErrorsInterceptor.ServerError();
    }
  }

  async editUser() {
    try {
    } catch (e) {
      return ErrorsInterceptor.ServerError();
    }
  }

  async deleteUser(data: any) {
    try {
    } catch (e) {
      return ErrorsInterceptor.ServerError();
    }
  }
}

export default new UserService();
