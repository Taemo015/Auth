import { UserData } from "./../types/types";
import { FormUserDataLogin, ResponseUserData } from "shared/types/types";
import AxiosService from "shared/utils/AxiosService";

export class AuthRepository {
  private static _endpointRegistration = "auth/registration";
  private static _endpointLogin = "auth/login";
  private static _endpointLogout = "auth/logout";
  private static _endpointAccount = "auth/account";

  static async registration(params: FormData): Promise<ResponseUserData> {
    const { data } = await AxiosService.instance.post(
      AuthRepository._endpointRegistration,
      params
    );
    return data;
  }

  static async login(params: FormData): Promise<FormUserDataLogin> {
    const { data } = await AxiosService.instance.post(
      AuthRepository._endpointLogin,
      params
    );
    return data;
  }

  static async logout(): Promise<boolean> {
    const { data } = await AxiosService.instance.get(
      AuthRepository._endpointLogout
    );
    return data;
  }

  static async getAccount(): Promise<UserData> {
    const { data } = await AxiosService.instance.get(
      AuthRepository._endpointAccount
    );
    return data;
  }
}
