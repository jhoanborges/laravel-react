import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage
import { notificationReducer, uiReducer } from './slices';

// Combine all reducers
const rootReducer = combineReducers({
    ui: uiReducer,
    notification: notificationReducer,
});

// Redux Persist configuration
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    // Only persist specific slices if needed
    // whitelist: ['ui'], // only ui will be persisted
    // blacklist: ['notification'], // notification won't be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store with persistence
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore redux-persist actions
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

// Create persistor for PersistGate
export const persistor = persistStore(store);

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Function to create a fresh store (for SSR without persistence)
export const createStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
};
