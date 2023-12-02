import { createSlice } from '@reduxjs/toolkit';
import { IFilmContamination, IGreenhouseGases, IShip } from 'library/types/marineFarming';
import greenhouseGasesMapper from 'library/mappers/greenhouseGases.mapper';
import shipsMapper from 'library/mappers/ships.mapper';
import filmContaminationMapper from 'library/mappers/filmContamination.mapper';
import shipData from 'library/data/marineFarming/ships.data.json';
import filmContaminationData from 'library/data/marineFarming/filmContamination.data.json';
import greenhouseGasesData from 'library/data/marineFarming/greenhouseGases.data.json';
import { IFilterType } from 'library/types/system.d';

type Filters = {
	ships: IFilterType<IShip>[],
	greenhouseGases: IFilterType<IGreenhouseGases>[],
	filmContamination: IFilterType<IFilmContamination>[],
};

export type MarineFarmingState = {
    ships: IShip[];
    greenhouseGases: IGreenhouseGases[];
    filmContamination: IFilmContamination[];
    filters: Filters;
};

const initialState: MarineFarmingState = {
	ships: shipsMapper((shipData as any).data),
	filmContamination: filmContaminationMapper(filmContaminationData.data),
	greenhouseGases: greenhouseGasesMapper(greenhouseGasesData.data),
	filters: {
		ships: [],
		greenhouseGases: [],
		filmContamination: [],
	},

};

const marineFarmingSlice = createSlice({
	name: 'marine-farming',
	initialState,
	reducers: {

	},
});

// export const {} = marineFarmingSlice.actions;

export default marineFarmingSlice.reducer;
