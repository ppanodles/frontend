import { createSlice } from '@reduxjs/toolkit';
import { IFilmContamination, IGreenhouseGases, IShip } from 'library/types/MarineFarming/index.d';
import greenhouseGasesMapper from 'library/mappers/greenhouseGases.mapper';
import shipsMapper from 'library/mappers/ships.mapper';
import filmContaminationMapper from 'library/mappers/filmContamination.mapper';
import shipData from 'library/data/marineFarming/ships.data.json';
import filmContaminationData from 'library/data/marineFarming/filmContamination.data.json';
import greenhouseGasesData from 'library/data/marineFarming/greenhouseGases.data.json';

export type MarineFarmingState = {
    ships: IShip[];
    greenhouseGases: IGreenhouseGases[];
    filmContamination: IFilmContamination[];
    filters: {[key: string]: { value: string; state: boolean; }}
};

const initialState: MarineFarmingState = {
	ships: shipsMapper((shipData as any).data),
	filmContamination: filmContaminationMapper(filmContaminationData.data),
	greenhouseGases: greenhouseGasesMapper(greenhouseGasesData.data),
	filters: {},

};

const marineFarmingSlice = createSlice({
	name: 'marineFarming',
	initialState,
	reducers: {},
});

// export const {} = marineFarmingSlice.actions;

export default marineFarmingSlice.reducer;
