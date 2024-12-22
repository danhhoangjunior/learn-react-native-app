import { configureStore } from '@reduxjs/toolkit';
import topicsReducer from './slices/topicsSlice';

const store = configureStore({
    reducer: {
        topics: topicsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
