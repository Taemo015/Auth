import Cookies from "universal-cookie";

import { AuthEnum } from "src/constants";
import { LoginResponse, Nullable } from "src/types/types";

import AxiosService from "./AxiosService";

export default class AuthService {
  private static _cookies = new Cookies();

  static get cookies(): Cookies {
    return AuthService._cookies;
  }

  static set cookies(value: Cookies) {
    AuthService._cookies = value;
  }

  public static getAccessToken(): Nullable<string> {
    return AuthService.cookies.get(AuthEnum.ACCESS_TOKEN);
  }

  public static getRefreshToken(): Nullable<string> {
    return AuthService.cookies.get(AuthEnum.REFRESH_TOKEN);
  }

  public static setToken({ accessToken, refreshToken }: LoginResponse) {
    AuthService.removeToken();

    const cookies = AuthService.cookies;
    cookies.set(AuthEnum.ACCESS_TOKEN, accessToken);
    cookies.set(AuthEnum.REFRESH_TOKEN, refreshToken);

    AxiosService.instance.defaults.headers.Authorization = `Bearer ${accessToken}`;
  }

  public static removeToken() {
    const cookies = AuthService.cookies;
    cookies.remove(AuthEnum.ACCESS_TOKEN);
    cookies.remove(AuthEnum.REFRESH_TOKEN);

    delete AxiosService.instance.defaults.headers.Authorization;
  }

  public static hasToken() {
    const cookies = AuthService.cookies;
    const accessToken = cookies.get(AuthEnum.ACCESS_TOKEN);
    const refreshToken = cookies.get(AuthEnum.REFRESH_TOKEN);

    return Boolean(accessToken && refreshToken);
  }
}
