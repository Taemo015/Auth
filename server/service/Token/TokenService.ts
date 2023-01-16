import jwt from "jsonwebtoken";
import { UserDataWithoutPassword } from "../../types/types";

import { TokensSecretKeys } from "./constants";
import { ITokenService } from "./types";

class TokenService implements ITokenService {
  generateTokens(payload: UserDataWithoutPassword) {
    const accessToken = jwt.sign(payload, TokensSecretKeys.ACCESS_TOKEN_KEY, {
      expiresIn: "24h",
    });
    const refreshToken = jwt.sign(payload, TokensSecretKeys.REFRESH_TOKEN_KEY, {
      expiresIn: "30d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  validAccessToken(accessToken: string): UserDataWithoutPassword | null {
    try {
      const dataUser = jwt.verify(
        accessToken,
        TokensSecretKeys.ACCESS_TOKEN_KEY
      );
      return dataUser as UserDataWithoutPassword;
    } catch (e) {
      return null;
    }
  }

  validRefreshToken(refreshToken: string): UserDataWithoutPassword | null {
    try {
      const dataUser = jwt.verify(
        refreshToken,
        TokensSecretKeys.REFRESH_TOKEN_KEY
      );
      return dataUser as UserDataWithoutPassword;
    } catch (e) {
      return null;
    }
  }
}

export default new TokenService();
