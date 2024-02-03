import { configureStore } from '@reduxjs/toolkit';
import { Middleware } from 'redux';
import logger from 'redux-logger';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist/es/constants';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from './root-reducer';
import { SIGN_IN_SUCCESS } from './user/user.reducer';

import { rootSaga } from './root-saga';

export type RootState = ReturnType<typeof rootReducer>;

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[];
};

const persistConfig: ExtendedPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [
  process.env.NODE_ENV !== 'production' && logger,
  sagaMiddleware as Middleware,
].filter((middleware): middleware is Middleware => Boolean(middleware));

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          SIGN_IN_SUCCESS,
        ],
        ignoredPaths: ['user.currentUser.createdAt'],
      },
    }).concat(middlewares);
  },
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
