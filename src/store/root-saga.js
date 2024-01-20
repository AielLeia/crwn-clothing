import { all, call } from "redux-saga/effects";
import { categoriesSaga } from "./categories/categories.saga.js";

export function* rootSaga() {
  yield all([call(categoriesSaga)]);
}
