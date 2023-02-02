import { getIsLoading } from "./selectors";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData, Nullable } from "shared/types/types";

export interface AuthState {
  isLoading: boolean;
  user: Nullable<UserData>;
  error: Nullable<string>;
}

const initialState: AuthState = {
  isLoading: false,
  user: null,
  error: null,
};

const auth = createSlice({
  name: "@auth",
  initialState,
  reducers: {
    fetchRegistration: (state: AuthState, _action: PayloadAction<FormData>) => {
      state.isLoading = true;
    },
    fetchLogin: (state: AuthState, _action: PayloadAction<FormData>) => {
      state.isLoading = true;
    },
    fetchSuccess: (state: AuthState, action: PayloadAction<UserData>) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    fetchError: (state: AuthState, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    fetchLogout: (state: AuthState) => {
      state.isLoading = true;
    },
    fetchSuccessLogout: (state: AuthState) => {
      state.isLoading = false;
    },
    fetchLogoutError: (state: AuthState, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    fetchAccount: (state: AuthState) => {
      state.isLoading = true;
    },
    resetState: (): AuthState => initialState,
  },
});

export const { reducer, actions } = auth;
export default reducer;
