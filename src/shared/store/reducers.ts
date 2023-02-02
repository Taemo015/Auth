import { combineReducers } from "redux";
import { Reducer } from "@reduxjs/toolkit";
import auth, { AuthState } from "shared/features/Auth/ducks";

export type AppState = {
  auth: AuthState;
};

export default (): Reducer<AppState> =>
  combineReducers<AppState>({
    auth,
  });
