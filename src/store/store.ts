import { configureStore } from '@reduxjs/toolkit';
import { Middleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from './root-reducer';
import { SIGN_IN_SUCCESS } from './user/user.reducer';

import { rootSaga } from './root-saga';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  process.env.NODE_ENV !== 'production' && logger,
  sagaMiddleware as Middleware,
].filter((middleware): middleware is Middleware => Boolean(middleware));

export function setUpStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [SIGN_IN_SUCCESS],
          ignoredPaths: ['user.currentUser.createdAt'],
        },
      }).concat(middlewares);
    },
  });
}

export const store = setUpStore();

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setUpStore>;
