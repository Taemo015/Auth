import { useDispatch } from "react-redux";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { Nullable } from "shared/types/types";

import AuthService from "./AuthService";

export default class AxiosService {
  private static _axiosInstance: AxiosInstance = axios.create({
    baseURL: "http://localhost:7000/api/",
    headers: {
      "Content-Type": "application/json",
    },
  });

  static get instance() {
    return this._axiosInstance;
  }
}

AxiosService.instance.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig | any => {
    //TODO Исправить any
    if (AuthService.hasToken() && !AuthService.getTokenAuthHead()) {
      //@ts-ignore
      config.headers.Authorization = `Bearer ${AuthService.getAccessToken()}`;
    }
    return config;
  },
  (error: AxiosError): Promise<void> => {
    return Promise.reject(error);
  }
);

AxiosService.instance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest: Nullable<AxiosRequestConfig> = error.config;

    if (error?.response?.status === 401 && originalRequest) {
      const { data } = await AxiosService.instance.get("refresh", {
        withCredentials: true,
      });

      AuthService.setToken({ ...data });

      // @ts-ignore
      originalRequest.headers.Authorization = `Bearer ${AuthService.getAccessToken()}`;
      AxiosService.instance(originalRequest);
    } else {
      return Promise.reject(error);
    }
  }
);
