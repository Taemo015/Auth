import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import rootSaga from "./saga";
import rootReducer from "./reducers";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const store = configureStore({
  reducer: rootReducer(),
  middleware,
});

export default store;

sagaMiddleware.run(rootSaga);
