import { createSlice } from '@reduxjs/toolkit';
import { IFilmContamination, IGreenhouseGases, IShip } from 'library/types/MarineFarming/index.d';

import shipData from 'library/data/marineFarming/ships.data.json';
import filmContaminationData from 'library/data/marineFarming/filmContamination.data.json';

export type MarineFarmingState = {
    ships: IShip[];
    greenhouseGases?: IGreenhouseGases[];
    filmContamination: IFilmContamination[];
    filters: {[key: string]: { value: string; state: boolean; }}
};

const initialState: MarineFarmingState = {
	ships: (shipData as { data: IShip[] }).data,
	filmContamination: (filmContaminationData as { data: IFilmContamination[] }).data,
	greenhouseGases: undefined,
	filters: {},

};

const marineFarmingSlice = createSlice({
	name: 'marineFarming',
	initialState,
	reducers: {},
});

// export const {} = marineFarmingSlice.actions;

export default marineFarmingSlice.reducer;
