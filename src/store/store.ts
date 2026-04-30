// Redux Core
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Persistence Config
const persistConfig = {
  key: 'root',
  storage,
};

// Reducer
import favoriteReducer from './slices/favoriteSlice';

// Root Reducer
const rootReducer = combineReducers({
  favorite: favoriteReducer,
});

// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Make Store
export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

// Persistor
export const persistor = (store: AppStore) => persistStore(store);

// Type
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];