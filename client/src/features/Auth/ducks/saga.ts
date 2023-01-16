import { call, put, takeLatest } from "@redux-saga/core/effects";
import { ResponseUserData } from "src/types/types";
import AuthService from "src/utils/AuthService";
import { AuthRepository } from "src/utils/AuthRepository";
import { actions } from "./index";

export function* fetchRegistration(
  action: ReturnType<typeof actions.fetchRegistration>
) {
  try {
    const formData = action.payload;
    const data: ResponseUserData = yield call(
      AuthRepository.registration,
      formData
    );

    const { user, tokens } = data;

    AuthService.setToken({ ...tokens });
    yield put(actions.fetchSuccess({ ...user }));
  } catch (e) {
    yield put(actions.fetchError());
  }
}

export function* fetchLogin(
  action: ReturnType<typeof actions.fetchLogin>
) {
  try {
    const formData = action.payload;
    const data: ResponseUserData = yield call(
      AuthRepository.login,
      formData
    );

    const { user, tokens } = data;

    AuthService.setToken({ ...tokens });
    yield put(actions.fetchSuccess({ ...user }));
  } catch (e) {
    yield put(actions.fetchError());
  }
}

export function* fetchLogout() {
  try {
    AuthService.removeToken();
    yield call(AuthRepository.logout);

    yield put(actions.fetchSuccessLogout());
  } catch (e) {
    yield put(actions.fetchLogoutError());
  }
}

export default function* actionWatcher() {
  yield takeLatest(actions.fetchRegistration.type, fetchRegistration);
  yield takeLatest(actions.fetchLogin.type, fetchLogin);
  yield takeLatest(actions.fetchLogout.type, fetchLogout);
}
