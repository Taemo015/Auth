export type Keys = "registration" | "login" | "logout" | "refresh";

export type UserData = {
  email: string;
  nickname: string;
  password: string;
};

export type IUser = {
  [P in Keys]: <T>(...params: Array<any>) => any;
};

export type UserDataWithoutPassword = Omit<UserData, "password">;
