import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormUserData, Nullable } from "src/types/types";

export interface AuthState {
  isLoading: boolean;
  user: Nullable<FormUserData>;
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
    fetchSuccess: (state: AuthState, action: PayloadAction<FormUserData>) => {
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
    resetState: (): AuthState => initialState,
  },
});

export const { reducer, actions } = auth;
export default reducer;
