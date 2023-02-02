import { takeLatest } from '@redux-saga/core/effects';
import { actions } from "./index";

export function* loginWarker() {}

export default function* loginWatcher() {
  yield takeLatest(actions.fetch.type, loginWarker);
}
