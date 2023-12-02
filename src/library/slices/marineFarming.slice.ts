import { createSlice } from '@reduxjs/toolkit';
import { IShip } from 'library/types/MarineFarming/index.d';

import shipData from 'library/data/marineFarming/ships.data.json';

export type MarineFarmingState = {
    ships: IShip[];
};

const initialState: MarineFarmingState = {
	ships: (shipData as any).data,
};

const marineFarmingSlice = createSlice({
	name: 'marineFarming',
	initialState,
	reducers: {},
});

// export const {} = marineFarmingSlice.actions;

export default marineFarmingSlice.reducer;
