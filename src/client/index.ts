import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import { reducers, sagas as rootSaga } from "shared/store";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const store = configureStore({
  reducer: reducers(),
  middleware,
});

export default store;

sagaMiddleware.run(rootSaga);
