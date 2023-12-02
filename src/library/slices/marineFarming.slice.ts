import { createSlice } from '@reduxjs/toolkit';
import { IFilmContamination, IGreenhouseGases, IShip } from 'library/types/marineFarming.d';
import greenhouseGasesMapper from 'library/mappers/greenhouseGases.mapper';
import shipsMapper from 'library/mappers/ships.mapper';
import filmContaminationMapper from 'library/mappers/filmContamination.mapper';
import shipData from 'library/data/marineFarming/ships.data.json';
import filmContaminationData from 'library/data/marineFarming/filmContamination.data.json';
import greenhouseGasesData from 'library/data/marineFarming/greenhouseGases.data.json';
import { IFilterType } from 'library/types/system.d';
import FilterType from 'library/constants/FilterType';

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
		ships: [
			{ type: FilterType.LIST_SELECTOR, field: 'vessel_type', name: 'Тип судна' },
			{ type: FilterType.LIST_SELECTOR, field: 'vessel_name', name: 'Наименование судна' },
			{ type: FilterType.LIST_SELECTOR, field: 'flag_country', name: 'Страна регистрации судна'},
			{ type: FilterType.LIST_SELECTOR, field: 'destination', name: 'Порт назначения'},
			{ type: FilterType.DATE_TIME_RANGE, field: 'eta', name: 'Время прибытия'},
		],
		greenhouseGases: [
			{type: FilterType.RANGE, field: 'emissionLevel', name: 'Уровень эмиссии'},
		],
		filmContamination: [
			{ type: FilterType.LIST_SELECTOR, field: 'type', name: 'Тип пленочного загрязнения' },
			{ type: FilterType.LIST_SELECTOR, field: 'name', name: 'Наименование загрязнения' },
		],
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
