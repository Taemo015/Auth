import bcrypt from "bcryptjs";
import AuthModels from "./AuthModels";
import ErrorsInterceptor from "../../errorsListener/ErrorsInterceptor";
import UserService from "../User/UserService";
import { DataRequest } from "../types";

class AuthService {
  async checkEmail(email: string) {
    const checkEmail = await AuthModels.findOne({ where: { email } });
    return checkEmail ? checkEmail : undefined;
  }

  async checkPassword(password: string, userPassword: string) {
    const checkPassword = await bcrypt.compare(password, userPassword);
    return checkPassword ? checkPassword : undefined;
  }

  async registration(data: DataRequest) {
    const { email, nickname, password } = data;
    const checkEmail = await this.checkEmail(email);
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

  async login(data: DataRequest) {
    const { email, password } = data;
    const checkEmail = await this.checkEmail(email);
    const checkPassword =
      checkEmail && (await this.checkPassword(password, checkEmail?.password));

    if (!checkEmail || !checkPassword) {
      return ErrorsInterceptor.BadRequest(
        400,
        "Пользователя с таким email не существует"
      );
    }
    const user = await UserService.getUser(email, checkEmail.id);
    return user;
  }

  async logout() {}

  async account(data: DataRequest) {
    const { email, password } = data;
    const checkEmail = await this.checkEmail(email);
    if (!checkEmail) {
      return ErrorsInterceptor.BadRequest(
        400,
        "Пользователя с таким email не существует"
      );
    }
    const user = await UserService.getUser(email, checkEmail.id);
    return user;
  }
}

export default new AuthService();
