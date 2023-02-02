import { all, spawn } from "redux-saga/effects";
import registration from "shared/features/Auth/ducks/saga";

const sagas = [registration];

export default function* rootSaga() {
  yield all(sagas.map((saga) => spawn(saga)));
}
