import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	IEcoFarmlandState, IFilmContamination, IGreenhouseGases, IShip,
} from 'library/types/marineFarming.d';
import greenhouseGasesMapper from 'library/mappers/greenhouseGases.mapper';
import ecoFarmlandStateMapper from 'library/mappers/ecoFarmland.mapper';
import shipsMapper from 'library/mappers/ships.mapper';
import filmContaminationMapper from 'library/mappers/filmContamination.mapper';
import shipJSON from 'library/data/marineFarming/ships.data.json';
import filmContaminationJSON from 'library/data/marineFarming/filmContamination.data.json';
import greenhouseGasesJSON from 'library/data/marineFarming/greenhouseGases.data.json';
import ecoFarmlandStateJSON from 'library/data/marineFarming/ecoFarmlandState.data.json';
import { IFilterDataType } from 'library/types/system.d';
import FilterType from 'library/constants/FilterType';
import MarineFarmingDataType from 'library/constants/MarineFarmingSlice';
import {
	DateTimePickPayload,
	DateTimeRangePayload,
	ListSelectorPayload,
	RangePayload,
} from 'library/types/filterPayload.d';
import {
	keys, pickBy, uniqBy, values,
} from 'lodash';
import getDefaultRange from 'library/helpers/getDefaultRange';
import getDefaultDateRange from 'library/helpers/getDefaultDateRange';
import { LayoutType } from 'library/paths';

const shipsData: IShip[] = shipsMapper((shipJSON as any).data);
const filmContaminationData: IFilmContamination[] = filmContaminationMapper(
	filmContaminationJSON.data,
);
const greenhouseGasesData: IGreenhouseGases[] = greenhouseGasesMapper(greenhouseGasesJSON.data);

const ecoFarmlandStateData: IEcoFarmlandState[] = ecoFarmlandStateMapper(ecoFarmlandStateJSON.data);

export type Filters = {
  [MarineFarmingDataType.SHIPS]: IFilterDataType<IShip>;
  [MarineFarmingDataType.GREENHOUSE_GASES]: IFilterDataType<IGreenhouseGases>;
  [MarineFarmingDataType.FILM_CONTAMINATION]: IFilterDataType<IFilmContamination>;
};

export type ISlicesStatus = {
  [key in MarineFarmingDataType]: boolean;
};

export type IEnableMultiSelect = {
  [key in LayoutType]?: boolean;
};

export type IEnabledSlices = {
	[key1 in LayoutType]: {
			[key2 in MarineFarmingDataType]: boolean;
}}

export type MarineFarmingState = {
  ships: IShip[];
  filmContamination: IFilmContamination[];
  greenhouseGases: IGreenhouseGases[];
  ecoFarmlandState: IEcoFarmlandState[]
  filters: Filters;
  /**
   * Флаги включения слоев
   */
  slicesStatus: ISlicesStatus;
  /**
   * Какие данные доступны в представлениях
   */
  enableSlices: IEnabledSlices;
  /**
   * На каких экранах можно выбрать одновременно несколько слоев (slicesStatus)
   */
  enableMultiSelect: IEnableMultiSelect;
};

type ShipsFilterPayload =
  | ListSelectorPayload<MarineFarmingDataType.SHIPS, keyof IShip>
  | DateTimeRangePayload<MarineFarmingDataType.SHIPS, keyof IShip>
  | DateTimePickPayload<MarineFarmingDataType.SHIPS, keyof IShip>
  | RangePayload<MarineFarmingDataType.SHIPS, keyof IShip>;

type GreenhouseGasesFilterPayload =
  | ListSelectorPayload<MarineFarmingDataType.GREENHOUSE_GASES, keyof IGreenhouseGases>
  | DateTimeRangePayload<MarineFarmingDataType.GREENHOUSE_GASES, keyof IGreenhouseGases>
  | DateTimePickPayload<MarineFarmingDataType.GREENHOUSE_GASES, keyof IGreenhouseGases>
  | RangePayload<MarineFarmingDataType.GREENHOUSE_GASES, keyof IGreenhouseGases>;

type FilmContaminationFilterPayload =
  | ListSelectorPayload<MarineFarmingDataType.FILM_CONTAMINATION, keyof IFilmContamination>
  | DateTimeRangePayload<MarineFarmingDataType.FILM_CONTAMINATION, keyof IFilmContamination>
  | DateTimePickPayload<MarineFarmingDataType.FILM_CONTAMINATION, keyof IFilmContamination>
  | RangePayload<MarineFarmingDataType.FILM_CONTAMINATION, keyof IFilmContamination>;

type ApplyFilterPayload =
  | ShipsFilterPayload
  | GreenhouseGasesFilterPayload
  | FilmContaminationFilterPayload;

const initialState: MarineFarmingState = {
	ships: shipsData,
	filmContamination: filmContaminationData,
	greenhouseGases: greenhouseGasesData,
	ecoFarmlandState: ecoFarmlandStateData,
	filters: {
		[MarineFarmingDataType.SHIPS]: {
			[FilterType.LIST_SELECTOR]: {
				vesselType: {
					type: FilterType.LIST_SELECTOR,
					field: 'vesselType',
					name: 'Тип судна',
					shouldShowAlways: true,
					items: uniqBy(
						shipsData.filter((v) => v.vesselType !== undefined),
						'vesselType',
					).map((v) => ({ id: v.id, name: v.vesselType })),
					selected: {},
				},
				vesselName: {
					type: FilterType.LIST_SELECTOR,
					field: 'vesselName',
					name: 'Наименование судна',
					items: uniqBy(
						shipsData.filter((v) => v.vesselName !== undefined),
						'vesselName',
					).map((v) => ({ id: v.id, name: v.vesselName })),
					selected: {},
				},
				flagCountry: {
					type: FilterType.LIST_SELECTOR,
					field: 'flagCountry',
					name: 'Страна регистрации судна',
					items: uniqBy(
						shipsData.filter((v) => v.flagCountry !== undefined),
						'flagCountry',
					).map((v) => ({ id: v.id, name: v.flagCountry })),
					selected: {},
				},
				destinationPort: {
					type: FilterType.LIST_SELECTOR,
					field: 'destinationPort',
					name: 'Порт назначения',
					items: uniqBy(
						shipsData.filter((v) => v.destinationPort !== undefined),
						'destinationPort',
					).map((v) => ({ id: v.id, name: v.destinationPort })),
					selected: {},
				},
			},
			[FilterType.DATE_TIME_RANGE]: {
				eta: {
					type: FilterType.DATE_TIME_RANGE,
					field: 'eta',
					name: 'Время прибытия',
					borders: getDefaultDateRange(shipsData.map((v) => v.eta)),
				},
			},
		},
		[MarineFarmingDataType.GREENHOUSE_GASES]: {
			[FilterType.RANGE]: {
				emissionLevel: {
					type: FilterType.RANGE,
					field: 'emissionLevel',
					name: 'Уровень эмиссии',
					shouldShowAlways: true,
					borders: getDefaultRange(greenhouseGasesData.map((v) => v.emissionLevel)),
				},
			},
		},
		[MarineFarmingDataType.FILM_CONTAMINATION]: {
			[FilterType.DATE_TIME_RANGE]: {
				time: {
					type: FilterType.DATE_TIME_RANGE,
					field: 'time',
					name: 'Время прибытия',
					borders: getDefaultDateRange(filmContaminationData.map((v) => v.time)),
				},
			},
		},
	},
	slicesStatus: {
		[MarineFarmingDataType.SHIPS]: true,
		[MarineFarmingDataType.GREENHOUSE_GASES]: true,
		[MarineFarmingDataType.FILM_CONTAMINATION]: true,
	},
	enableSlices: {
		[LayoutType.MAP]: {
			[MarineFarmingDataType.SHIPS]: true,
			[MarineFarmingDataType.GREENHOUSE_GASES]: true,
			[MarineFarmingDataType.FILM_CONTAMINATION]: true,
		},
		[LayoutType.CHARTS]: {
			[MarineFarmingDataType.SHIPS]: false,
			[MarineFarmingDataType.GREENHOUSE_GASES]: true,
			[MarineFarmingDataType.FILM_CONTAMINATION]: true,
		},
		[LayoutType.TABLE]: {
			[MarineFarmingDataType.SHIPS]: true,
			[MarineFarmingDataType.GREENHOUSE_GASES]: true,
			[MarineFarmingDataType.FILM_CONTAMINATION]: true,
		},
	},
	enableMultiSelect: {
		[LayoutType.MAP]: true,
	},
};

const marineFarmingSlice = createSlice({
	name: 'marine-farming',
	initialState,
	reducers: {
		selectFirstEnableSlice(state, { payload: currentLayout }: PayloadAction<LayoutType | undefined>) {
			if (currentLayout) {
				const firstEnableSlice: MarineFarmingDataType | undefined = (keys(pickBy(state.enableSlices[currentLayout], Boolean)) as MarineFarmingDataType[])?.[0];

				if (firstEnableSlice) {
					(keys(state.slicesStatus) as MarineFarmingDataType[]).forEach((slice: MarineFarmingDataType) => {
						state.slicesStatus[slice] = firstEnableSlice === slice;
					});
				}
			}
		},
		toggleSliceAccessibility(state, { payload: { dataType, currentLayout } }: PayloadAction<{ dataType: MarineFarmingDataType, currentLayout?: LayoutType }>) {
			const newValue = !state.slicesStatus[dataType];

			const isActionAvailable = newValue || values(state.slicesStatus).filter(Boolean).length > 1;

			if (isActionAvailable && currentLayout !== undefined) {
				if (state.enableMultiSelect[currentLayout]) {
					state.slicesStatus[dataType] = !state.slicesStatus[dataType];
					(state.filters[dataType] as any) = initialState.filters[dataType];
				} else {
					(keys(state.slicesStatus) as MarineFarmingDataType[]).forEach((slice: MarineFarmingDataType) => {
						state.slicesStatus[slice] = dataType === slice ? newValue : false;
					});
					state.filters = initialState.filters;
				}
			}
		},
		applyFilter(state, {
			payload: {
				filter, field, value, dataType,
			},
		}: PayloadAction<ApplyFilterPayload>) {
			(state.filters[dataType] as any)[filter][field].selected = value;
		},
		dropFilterByField(state, { payload: { dataType, filter, field } }: PayloadAction<{dataType: MarineFarmingDataType, filter: FilterType, field: keyof IShip}>) {
			(state.filters[dataType] as any)[filter][field] = (initialState.filters[dataType] as any)[filter][field];
		},
		dropFilterByFilterType(state, { payload: { dataType, filter } }: PayloadAction<{dataType: MarineFarmingDataType, filter: FilterType }>) {
			(state.filters[dataType] as any)[filter] = (initialState.filters[dataType] as any)[filter];
		},
		dropFilterByDataType(state, { payload: { dataType } }: PayloadAction<{dataType: MarineFarmingDataType }>) {
			(state.filters[dataType] as any) = initialState.filters[dataType];
		},
		dropFilters(state) {
			state.filters = initialState.filters;
		},
	},
});

export const { toggleSliceAccessibility, applyFilter, selectFirstEnableSlice } = marineFarmingSlice.actions;

export default marineFarmingSlice.reducer;
