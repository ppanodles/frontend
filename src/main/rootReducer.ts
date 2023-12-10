import { configureStore } from '@reduxjs/toolkit';
import marineFarmingReducer from 'library/slices/marineFarming.slice';
import agroSliceReducer from 'library/slices/agro.slice';
import municipalitySliceReducer from 'library/slices/municipality.slice';

const store = configureStore({
	reducer: {
		marineFarming: marineFarmingReducer,
		agro: agroSliceReducer,
		municipality: municipalitySliceReducer,
	},
	devTools: process.env.NODE_ENV !== 'production',
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
