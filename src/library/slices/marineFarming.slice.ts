import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	IFilmContamination, IGreenhouseGases, IMonitoringStation, IShip,
} from 'library/types/marineFarming.d';
import greenhouseGasesMapper from 'library/mappers/greenhouseGases.mapper';
import shipsMapper from 'library/mappers/ships.mapper';
import filmContaminationMapper from 'library/mappers/filmContamination.mapper';
import shipJSON from 'library/data/marineFarming/ships.data.json';
import filmContaminationJSON from 'library/data/marineFarming/filmContamination.data.json';
import greenhouseGasesJSON from 'library/data/marineFarming/greenhouseGases.data.json';
import monitoringStationsJSON from 'library/data/marineFarming/monitoringStations.data.json';
import { IFilterDataType } from 'library/types/system.d';
import FilterType from 'library/constants/FilterType';
import MarineFarmingDataType from 'library/constants/MarineFarmingSlice';
import {
	DateTimePickPayload,
	DateTimeRangePayload,
	ListSelectorPayload,
	RangePayload,
	SelectOnePayload,
} from 'library/types/filterPayload.d';
import {
	keys, pickBy, uniqBy, values,
} from 'lodash';
import getDefaultRange from 'library/helpers/getDefaultRange';
import getDefaultDateRange from 'library/helpers/getDefaultDateRange';
import { LayoutType } from 'library/paths';
import monitoringStationsMapper from 'library/mappers/monitoringStations.mapper';

const shipsData: IShip[] = shipsMapper((shipJSON as any).data);
const filmContaminationData: IFilmContamination[] = filmContaminationMapper(
	filmContaminationJSON.data,
);
const greenhouseGasesData: IGreenhouseGases[] = greenhouseGasesMapper(greenhouseGasesJSON.data);

const monitoringStationsData: IMonitoringStation[] = monitoringStationsMapper(monitoringStationsJSON.data);

export type Filters = {
  [MarineFarmingDataType.SHIPS]: IFilterDataType<IShip>;
  [MarineFarmingDataType.GREENHOUSE_GASES]: IFilterDataType<IGreenhouseGases>;
  [MarineFarmingDataType.FILM_CONTAMINATION]: IFilterDataType<IFilmContamination>;
  [MarineFarmingDataType.MONITORING_STATIONS]: IFilterDataType<IMonitoringStation>;
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
  monitoringStations: IMonitoringStation[];
  isAnyFilterSelected: boolean;
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
  | RangePayload<MarineFarmingDataType.SHIPS, keyof IShip>
  | SelectOnePayload<MarineFarmingDataType.SHIPS, keyof IShip>;

type GreenhouseGasesFilterPayload =
  | ListSelectorPayload<MarineFarmingDataType.GREENHOUSE_GASES, keyof IGreenhouseGases>
  | DateTimeRangePayload<MarineFarmingDataType.GREENHOUSE_GASES, keyof IGreenhouseGases>
  | DateTimePickPayload<MarineFarmingDataType.GREENHOUSE_GASES, keyof IGreenhouseGases>
  | RangePayload<MarineFarmingDataType.GREENHOUSE_GASES, keyof IGreenhouseGases>
  | SelectOnePayload<MarineFarmingDataType.GREENHOUSE_GASES, keyof IGreenhouseGases>;

type FilmContaminationFilterPayload =
  | ListSelectorPayload<MarineFarmingDataType.FILM_CONTAMINATION, keyof IFilmContamination>
  | DateTimeRangePayload<MarineFarmingDataType.FILM_CONTAMINATION, keyof IFilmContamination>
  | DateTimePickPayload<MarineFarmingDataType.FILM_CONTAMINATION, keyof IFilmContamination>
  | RangePayload<MarineFarmingDataType.FILM_CONTAMINATION, keyof IFilmContamination>
  | SelectOnePayload<MarineFarmingDataType.FILM_CONTAMINATION, keyof IFilmContamination>;

type MonitoringStationsFilterPayload =
  | ListSelectorPayload<MarineFarmingDataType.MONITORING_STATIONS, keyof IMonitoringStation>
  | DateTimeRangePayload<MarineFarmingDataType.MONITORING_STATIONS, keyof IMonitoringStation>
  | DateTimePickPayload<MarineFarmingDataType.MONITORING_STATIONS, keyof IMonitoringStation>
  | SelectOnePayload<MarineFarmingDataType.MONITORING_STATIONS, keyof IMonitoringStation>;

type ApplyFilterPayload =
  | ShipsFilterPayload
  | GreenhouseGasesFilterPayload
  | FilmContaminationFilterPayload
  | MonitoringStationsFilterPayload

const initialState: MarineFarmingState = {
	ships: shipsData,
	filmContamination: filmContaminationData,
	greenhouseGases: greenhouseGasesData,
	monitoringStations: monitoringStationsData,
	isAnyFilterSelected: false,
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
			[FilterType.DATE_TIME_RANGE]: {
				time: {
					type: FilterType.DATE_TIME_RANGE,
					field: 'time',
					name: 'Временной диапазон',
					shouldShowAlways: true,
					borders: getDefaultDateRange(greenhouseGasesData.map((v) => v.time)),
				},
			},
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
					name: 'Время возникновения',
					borders: getDefaultDateRange(filmContaminationData.map((v) => v.time)),
				},
			},
		},
		[MarineFarmingDataType.MONITORING_STATIONS]: {
			[FilterType.SELECT_ONE]: {
				id: {
					type: FilterType.SELECT_ONE,
					field: 'id',
					name: 'Станция мониторинга',
					variants: uniqBy(
						monitoringStationsData.filter((v) => v.id !== undefined),
						'id',
					).map((v) => ({id: v.id, name: v.name })),
					selected: {id: monitoringStationsData[0].id, name: monitoringStationsData[0].name},
				},
			},
			[FilterType.LIST_SELECTOR]: {
				name: {
					type: FilterType.LIST_SELECTOR,
					field: 'name',
					name: 'Станция мониторинга',
					shouldShowAlways: true,
					items: uniqBy(
						monitoringStationsData.filter((v) => v.name !== undefined),
						'name',
					).map((v) => ({ id: v.id, name: v.name })),
					selected: {},
				},
			},
		},
	},

	slicesStatus: {
		[MarineFarmingDataType.SHIPS]: true,
		[MarineFarmingDataType.GREENHOUSE_GASES]: true,
		[MarineFarmingDataType.FILM_CONTAMINATION]: true,
		[MarineFarmingDataType.MONITORING_STATIONS]: true,
	},
	enableSlices: {
		[LayoutType.MAP]: {
			[MarineFarmingDataType.SHIPS]: true,
			[MarineFarmingDataType.GREENHOUSE_GASES]: true,
			[MarineFarmingDataType.FILM_CONTAMINATION]: true,
			[MarineFarmingDataType.MONITORING_STATIONS]: true,
		},
		[LayoutType.CHARTS]: {
			[MarineFarmingDataType.SHIPS]: false,
			[MarineFarmingDataType.GREENHOUSE_GASES]: true,
			[MarineFarmingDataType.FILM_CONTAMINATION]: false,
			[MarineFarmingDataType.MONITORING_STATIONS]: true,
		},
		[LayoutType.TABLE]: {
			[MarineFarmingDataType.SHIPS]: true,
			[MarineFarmingDataType.GREENHOUSE_GASES]: true,
			[MarineFarmingDataType.FILM_CONTAMINATION]: false,
			[MarineFarmingDataType.MONITORING_STATIONS]: false,

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
			state.isAnyFilterSelected = true;
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
			state.isAnyFilterSelected = false;
		},
	},
});

export const {
	toggleSliceAccessibility, applyFilter, selectFirstEnableSlice, dropFilters,
} = marineFarmingSlice.actions;

export default marineFarmingSlice.reducer;
