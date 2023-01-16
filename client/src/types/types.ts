export type LoginResponse = {
  accessToken: string;
  refreshToken?: string;
  expires_in?: number;
};

export type FormUserData = {
  id: number
  email: string;
  nickname?: string;
  password: string;
};

export type FormUserDataLogin = Omit<FormUserData, 'nickname'>

export type ResponseUserData = {
  user: FormUserData;
  tokens: LoginResponse;
};

export type Nullable<T> = T | null | undefined
