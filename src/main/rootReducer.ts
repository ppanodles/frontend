import { configureStore } from '@reduxjs/toolkit';
import marineFarmingReducer from 'library/slices/marineFarming.slice';

const store = configureStore({
	reducer: {
		marineFarming: marineFarmingReducer,
	},
	devTools: process.env.NODE_ENV !== 'production',
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
