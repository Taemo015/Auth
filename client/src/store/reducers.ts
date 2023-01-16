import { combineReducers } from "redux";
import { Reducer } from "@reduxjs/toolkit";
import auth, { AuthState } from "src/features/Auth/ducks";

export type AppState = {
  auth: AuthState;
};

export default (): Reducer<AppState> =>
  combineReducers<AppState>({
    auth,
  });
