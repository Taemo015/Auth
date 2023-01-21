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
    } catch (e) {}
  }

  async getUser() {
    try {
    } catch (e) {}
  }

  async editUser() {
    try {
    } catch (e) {}
  }

  async deleteUser(data: any) {
    try {
    } catch (e) {}
  }
}

export default new UserService();
