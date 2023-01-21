import bcrypt from "bcryptjs";
import AuthModels from "./AuthModels";
import ErrorsInterceptor from "../../errorsListener/ErrorsInterceptor";
import UserService from "../User/UserService";
import { DataRequest } from "../types";

class AuthService {
  async registration(data: DataRequest) {
    const { email, nickname, password } = data;
    const checkEmail = await AuthModels.findOne({ where: { email } });
    const checkNickname = await UserService.checkNickname(nickname);
    if (checkEmail) {
      return ErrorsInterceptor.BadRequest(
        409,
        "Пользователь с таким email уже существует"
      );
    }
    if (checkNickname) {
      return ErrorsInterceptor.BadRequest(409, "Такой ник занят");
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const auth_record = new AuthModels({ email, password: hashPassword });
    await auth_record.save();

    const createUser = await UserService.createUser(data, auth_record.id);
    return createUser;
  }

  async login() {}

  async logout() {}
}

export default new AuthService();
