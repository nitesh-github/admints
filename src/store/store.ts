import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import authReducer from './authSlice';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'auth', // Key for the persisted slice
  storage,     // Storage method (localStorage in this case)
};
const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
  },
});

const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
// export default store;
export { store, persistor };