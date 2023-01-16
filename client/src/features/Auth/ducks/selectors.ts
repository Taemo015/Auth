import { AppState } from "src/store/reducers";
import { FormUserData, Nullable } from "src/types/types";

export const getIsLoading = (state: AppState): boolean => state.auth.isLoading;
export const getIsError = (state: AppState): boolean => state.auth.error;
export const getUser = (state: AppState): Nullable<FormUserData> =>
  state.auth.user;
