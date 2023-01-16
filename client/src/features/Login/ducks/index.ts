import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LoginState {}

const initialState: any = {};

const login = createSlice({
  name: "@login",
  initialState,
  reducers: {
    fetch: (state: LoginState, action: PayloadAction) => {},
    resetState: (): LoginState => initialState,
  },
});

export const { actions, reducer } = login;
export default reducer;
