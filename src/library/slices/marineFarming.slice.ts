import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFilmContamination, IGreenhouseGases, IShip } from 'library/types/marineFarming.d';
import greenhouseGasesMapper from 'library/mappers/greenhouseGases.mapper';
import shipsMapper from 'library/mappers/ships.mapper';
import filmContaminationMapper from 'library/mappers/filmContamination.mapper';
import shipData from 'library/data/marineFarming/ships.data.json';
import filmContaminationData from 'library/data/marineFarming/filmContamination.data.json';
import greenhouseGasesData from 'library/data/marineFarming/greenhouseGases.data.json';
import { IFilterType } from 'library/types/system.d';
import FilterType from 'library/constants/FilterType';
import MarineFarmingDataType from 'library/constants/MarineFarmingSlice';

export type Filters = {
	[MarineFarmingDataType.SHIPS]: IFilterType<IShip>[],
	[MarineFarmingDataType.GREENHOUSE_GASES]: IFilterType<IGreenhouseGases>[],
	[MarineFarmingDataType.FILM_CONTAMINATION]: IFilterType<IFilmContamination>[],
};

export type ISlicesAccessibility = {
	[key in keyof Filters]: boolean;
};

export type MarineFarmingState = {
    ships: IShip[];
    greenhouseGases: IGreenhouseGases[];
    filmContamination: IFilmContamination[];
    filters: Filters;
	slicesAccessibility: ISlicesAccessibility,
	selectedTable: MarineFarmingDataType;
};

const initialState: MarineFarmingState = {
	ships: shipsMapper((shipData as any).data),
	filmContamination: filmContaminationMapper(filmContaminationData.data),
	greenhouseGases: greenhouseGasesMapper(greenhouseGasesData.data),
	filters: {
		[MarineFarmingDataType.SHIPS]: [
			{ type: FilterType.LIST_SELECTOR, field: 'vessel_type', name: 'Тип судна' },
			{ type: FilterType.LIST_SELECTOR, field: 'vessel_name', name: 'Наименование судна' },
			{ type: FilterType.LIST_SELECTOR, field: 'flag_country', name: 'Страна регистрации судна'},
			{ type: FilterType.LIST_SELECTOR, field: 'destination', name: 'Порт назначения'},
			{ type: FilterType.DATE_TIME_RANGE, field: 'eta', name: 'Время прибытия'},
		],
		[MarineFarmingDataType.GREENHOUSE_GASES]: [
			{type: FilterType.RANGE, field: 'emissionLevel', name: 'Уровень эмиссии'},
		],
		[MarineFarmingDataType.FILM_CONTAMINATION]: [
			{ type: FilterType.LIST_SELECTOR, field: 'type', name: 'Тип пленочного загрязнения' },
			{ type: FilterType.LIST_SELECTOR, field: 'name', name: 'Наименование загрязнения' },
		],
	},
	slicesAccessibility: {
		[MarineFarmingDataType.SHIPS]: true,
		[MarineFarmingDataType.GREENHOUSE_GASES]: true,
		[MarineFarmingDataType.FILM_CONTAMINATION]: true,
	},
	selectedTable: MarineFarmingDataType.SHIPS,
};

const marineFarmingSlice = createSlice({
	name: 'marine-farming',
	initialState,
	reducers: {
		toggleSliceAccessibility(state, action: PayloadAction<MarineFarmingDataType>) {
			state.slicesAccessibility[action.payload] = !state.slicesAccessibility[action.payload];
		},
	},
});

export const { toggleSliceAccessibility } = marineFarmingSlice.actions;

export default marineFarmingSlice.reducer;
