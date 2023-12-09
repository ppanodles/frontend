import { configureStore } from '@reduxjs/toolkit';
import marineFarmingReducer from 'library/slices/marineFarming.slice';
import ecoFarmlandSliceReducer from 'library/slices/ecoFarmland.slice';
import ecoCitySliceReducer from 'library/slices/ecoCity.slice';

const store = configureStore({
	reducer: {
		marineFarming: marineFarmingReducer,
		ecoFarmland: ecoFarmlandSliceReducer,
		ecoCity: ecoCitySliceReducer,
	},
	devTools: process.env.NODE_ENV !== 'production',
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
