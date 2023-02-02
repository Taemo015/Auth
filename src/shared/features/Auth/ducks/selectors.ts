import { AppState } from "shared/store/reducers";
import { UserData, Nullable } from "shared/types/types";

export const getIsLoading = (state: AppState): boolean => state.auth.isLoading;
export const getIsError = (state: AppState): Nullable<string> =>
  state.auth.error;
export const getUser = (state: AppState): Nullable<UserData> =>
  state.auth.user;
