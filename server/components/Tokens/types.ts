import { DataRequest } from "../types";

export type TokensType = {
  accessToken: string;
  refreshToken: string;
};

export type TokensData = Omit<DataRequest, "password">;
