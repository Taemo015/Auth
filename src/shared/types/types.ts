export type LoginResponse = {
  accessToken: string;
  refreshToken?: string;
  expires_in?: number;
};

export type UserData = {
  id: number
  email: string;
  nickname?: string;
  password: string;
};

export type FormUserDataLogin = Omit<UserData, 'nickname'>

export type ResponseUserData = {
  user: UserData;
  tokens: LoginResponse;
};

export type Nullable<T> = T | null | undefined
