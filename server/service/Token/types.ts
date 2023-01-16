import { JwtPayload } from "jsonwebtoken";
import { UserDataWithoutPassword } from "../../types/types";

export type TokensType = {
  accessToken: string;
  refreshToken: string;
};

export interface ITokenService {
  generateTokens: (payload: UserDataWithoutPassword) => TokensType;
  validAccessToken: (accessToken: string) => JwtPayload | string | null;
  validRefreshToken: (refreshToken: string) => JwtPayload | string | null;
}
