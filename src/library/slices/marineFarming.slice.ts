import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFilmContamination, IGreenhouseGases, IShip } from 'library/types/marineFarming.d';
import greenhouseGasesMapper from 'library/mappers/greenhouseGases.mapper';
import shipsMapper from 'library/mappers/ships.mapper';
import filmContaminationMapper from 'library/mappers/filmContamination.mapper';
import shipData from 'library/data/marineFarming/ships.data.json';
import filmContaminationData from 'library/data/marineFarming/filmContamination.data.json';
import greenhouseGasesData from 'library/data/marineFarming/greenhouseGases.data.json';
import { IFilterDataType } from 'library/types/system.d';
import FilterType from 'library/constants/FilterType';
import MarineFarmingDataType from 'library/constants/MarineFarmingSlice';
import {
	DateTimePickPayload, DateTimeRangePayload, ListSelectorPayload, RangePayload,
} from 'library/types/filterPayload.d';
import {uniqBy} from 'lodash';

const shipsData: IShip[] = shipsMapper((shipData as any).data);

console.log(shipsData);

export type Filters = {
	[MarineFarmingDataType.SHIPS]: IFilterDataType<IShip>,
	[MarineFarmingDataType.GREENHOUSE_GASES]: IFilterDataType<IGreenhouseGases>,
	[MarineFarmingDataType.FILM_CONTAMINATION]: IFilterDataType<IFilmContamination>,
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

type ShipsFilterPayload =
	ListSelectorPayload<MarineFarmingDataType.SHIPS, keyof IShip>
		| DateTimeRangePayload<MarineFarmingDataType.SHIPS, keyof IShip>
		| DateTimePickPayload<MarineFarmingDataType.SHIPS, keyof IShip>
		| RangePayload<MarineFarmingDataType.SHIPS, keyof IShip>;

type GreenhouseGasesFilterPayload =
	ListSelectorPayload<MarineFarmingDataType.GREENHOUSE_GASES, keyof IGreenhouseGases>
		| DateTimeRangePayload<MarineFarmingDataType.GREENHOUSE_GASES, keyof IGreenhouseGases>
		| DateTimePickPayload<MarineFarmingDataType.GREENHOUSE_GASES, keyof IGreenhouseGases>
		| RangePayload<MarineFarmingDataType.GREENHOUSE_GASES, keyof IGreenhouseGases>;

type FilmContaminationFilterPayload =
	ListSelectorPayload<MarineFarmingDataType.FILM_CONTAMINATION, keyof IFilmContamination>
		| DateTimeRangePayload<MarineFarmingDataType.FILM_CONTAMINATION, keyof IFilmContamination>
		| DateTimePickPayload<MarineFarmingDataType.FILM_CONTAMINATION, keyof IFilmContamination>
		| RangePayload<MarineFarmingDataType.FILM_CONTAMINATION, keyof IFilmContamination>;

type ApplyFilterPayload = ShipsFilterPayload | GreenhouseGasesFilterPayload | FilmContaminationFilterPayload;

const initialState: MarineFarmingState = {
	ships: shipsData,
	filmContamination: filmContaminationMapper(filmContaminationData.data),
	greenhouseGases: greenhouseGasesMapper(greenhouseGasesData.data),
	filters: {
		[MarineFarmingDataType.SHIPS]: {
			vesselType: {
				[FilterType.LIST_SELECTOR]: {
					type: FilterType.LIST_SELECTOR,
					field: 'vesselType',
					name: 'Тип судна',
					shouldShowAlways: true,
					items: uniqBy(shipsData
						.filter((v) => v.vesselType !== undefined), 'vesselType')
						.map((v) => ({ id: v.vesselType, name: v.vesselType })),
					selected: {},
				},
			},
			vesselName: {
				[FilterType.LIST_SELECTOR]: {
					type: FilterType.LIST_SELECTOR,
					field: 'vesselName',
					name: 'Наименование судна',
					items: uniqBy(shipsData
						.filter((v) => v.vesselName !== undefined), 'vesselName')
						.map((v) => ({ id: v.vesselName, name: v.vesselName })),
					selected: {},
				},
			},
			flagCountry: {
				[FilterType.LIST_SELECTOR]: {
					type: FilterType.LIST_SELECTOR,
					field: 'flagCountry',
					name: 'Страна регистрации судна',
					items: uniqBy(shipsData
						.filter((v) => v.flagCountry !== undefined), 'flagCountry')
						.map((v) => ({ id: v.flagCountry, name: v.flagCountry })),
					selected: {},
				},
			},
			destination: {
				[FilterType.LIST_SELECTOR]: {
					type: FilterType.LIST_SELECTOR,
					field: 'destination',
					name: 'Порт назначения',
					items: uniqBy(shipsData
						.filter((v) => v.destination !== undefined), 'destination')
						.map((v) => ({ id: v.destination, name: v.destination })),
					selected: {},
				},
			},
			// eta: {
			// 	[FilterType.DATE_TIME_RANGE]: {
			// 		type: FilterType.DATE_TIME_RANGE,
			// 		field: 'eta',
			// 		name: 'Время прибытия',
			// 		items: uniqBy(shipsData
			// 			.filter((v) => v.eta !== undefined), 'eta')
			// 			.map((v) => ({ id: v.eta, name: v.eta })),
			// 		selected: {},
			// 	},
			// },
		},
		[MarineFarmingDataType.GREENHOUSE_GASES]: {
			// emissionLevel: {
			// 	[FilterType.RANGE]: {
			// 		type: FilterType.RANGE, field: 'emissionLevel', name: 'Уровень эмиссии', shouldShowAlways: true,
			// 	},
			// },
		},
		[MarineFarmingDataType.FILM_CONTAMINATION]: {
		// 	type: {
		// 		[FilterType.LIST_SELECTOR]: {
		// 			type: FilterType.LIST_SELECTOR, field: 'type', name: 'Тип пленочного загрязнения', shouldShowAlways: true,
		// 		},
		// 	},
		},
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
		applyFilter(state, {
			payload: {
				filter, field, value, dataType,
			},
		}: PayloadAction<ApplyFilterPayload>) {
			(state.filters[dataType] as any)[field][filter].selected = value;
		},
	},
});

export const { toggleSliceAccessibility, applyFilter } = marineFarmingSlice.actions;

export default marineFarmingSlice.reducer;
