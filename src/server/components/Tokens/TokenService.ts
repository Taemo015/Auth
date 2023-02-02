import jwt from "jsonwebtoken";

import { TokensSecretKeys } from "./constants";
import { TokensData } from "./types";

class TokenService {
  generateTokens(payload: TokensData) {
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

  validAccessToken(accessToken: string) {
    try {
      const dataUser = jwt.verify(
        accessToken,
        TokensSecretKeys.ACCESS_TOKEN_KEY
      );
      return dataUser;
    } catch (e) {
      return null;
    }
  }

  validRefreshToken(refreshToken: string) {
    try {
      const dataUser = jwt.verify(
        refreshToken,
        TokensSecretKeys.REFRESH_TOKEN_KEY
      );
      return dataUser;
    } catch (e) {
      return null;
    }
  }
}

export default new TokenService();
