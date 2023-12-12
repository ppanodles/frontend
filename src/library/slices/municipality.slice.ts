import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ecoLocationStateMapper from 'library/mappers/agro.mapper';
import municipalityStateJSON from 'library/data/municipality/municipalityState.data.json';
import { IFilterDataType } from 'library/types/system.d';
import FilterType from 'library/constants/FilterType';
import {
	DateTimePickPayload,
	DateTimeRangePayload,
	ListSelectorPayload,
	RangePayload,
} from 'library/types/filterPayload.d';
import {uniqBy} from 'lodash';
import getDefaultRange from 'library/helpers/getDefaultRange';
import getDefaultDateRange from 'library/helpers/getDefaultDateRange';
import { LayoutType } from 'library/paths';
import MunicipalityStateDataType from 'library/constants/MunicipalitySlice';
import { IMunicipalityState } from 'library/types/municipality.d';

const municipalityStateData: IMunicipalityState[] = ecoLocationStateMapper(municipalityStateJSON.data);

export type Filters = {
  [MunicipalityStateDataType.MUNICIPALITY_STATE]: IFilterDataType<IMunicipalityState>;
};

export type IEnableMultiSelect = {
  [key in LayoutType]?: boolean;
};

export type MunicipalityState = {
  municipalityState: IMunicipalityState[];
  filters: Filters;
  isAnyFilterSelected: boolean,
};

type MunicipalityFilterPayload =
  | ListSelectorPayload<MunicipalityStateDataType.MUNICIPALITY_STATE, keyof IMunicipalityState>
  | DateTimeRangePayload<MunicipalityStateDataType.MUNICIPALITY_STATE, keyof IMunicipalityState>
  | DateTimePickPayload<MunicipalityStateDataType.MUNICIPALITY_STATE, keyof IMunicipalityState>
  | RangePayload<MunicipalityStateDataType.MUNICIPALITY_STATE, keyof IMunicipalityState>;

const initialState: MunicipalityState = {
	municipalityState: municipalityStateData,
	isAnyFilterSelected: false,
	filters: {
		[MunicipalityStateDataType.MUNICIPALITY_STATE]: {
			[FilterType.DATE_TIME_RANGE]: {
				time: {
					type: FilterType.DATE_TIME_RANGE,
					field: 'time',
					name: 'Период времени',
					borders: getDefaultDateRange(municipalityStateData.map((v) => v.time)),
				},
			},
			[FilterType.LIST_SELECTOR]: {
				location: {
					type: FilterType.LIST_SELECTOR,
					field: 'location',
					name: 'Муниципалитет',
					shouldShowAlways: true,
					items: uniqBy(
						municipalityStateData.filter((v) => v.location !== undefined),
						'temp',
					).map((v) => ({ id: v.id, name: v.location })),
					selected: {},
				},
			},
			[FilterType.RANGE]: {
				temp: {
					type: FilterType.RANGE,
					field: 'temp',
					name: 'Температура',
					borders: getDefaultRange(municipalityStateData.map((v) => v.temp)),
					pepticColor: '#FFCC80',
				},
				pressure: {
					type: FilterType.RANGE,
					field: 'pressure',
					name: 'Давление',
					borders: getDefaultRange(municipalityStateData.map((v) => v.pressure)),
					pepticColor: '#8C9EFF',
				},
				humidity: {
					type: FilterType.RANGE,
					field: 'humidity',
					name: 'Влажность',
					borders: getDefaultRange(municipalityStateData.map((v) => v.humidity)),
					pepticColor: '#A5D6A7',
				},
				carbon: {
					type: FilterType.RANGE,
					field: 'carbon',
					name: 'Углерод',
					borders: getDefaultRange(municipalityStateData.map((v) => v.carbon)),
					pepticColor: '#84FFFF',
				},
			},
		},
	},
};

const municipalitySlice = createSlice({
	name: 'municipality',
	initialState,
	reducers: {
		applyFilter(state, {
			payload: {
				filter, field, value, dataType,
			},
		}: PayloadAction<MunicipalityFilterPayload>) {
			(state.filters[dataType] as any)[filter][field].selected = value;
			state.isAnyFilterSelected = true;
		},
		dropFilterByField(state, { payload: { dataType, filter, field } }: PayloadAction<{dataType: MunicipalityStateDataType, filter: FilterType, field: keyof IMunicipalityState}>) {
			(state.filters[dataType] as any)[filter][field] = (initialState.filters[dataType] as any)[filter][field];
		},
		dropFilterByFilterType(state, { payload: { dataType, filter } }: PayloadAction<{dataType: MunicipalityStateDataType, filter: FilterType }>) {
			(state.filters[dataType] as any)[filter] = (initialState.filters[dataType] as any)[filter];
		},
		dropFilterByDataType(state, { payload: { dataType } }: PayloadAction<{dataType: MunicipalityStateDataType }>) {
			(state.filters[dataType] as any) = initialState.filters[dataType];
		},
		dropFilters(state) {
			state.filters = initialState.filters;
			state.isAnyFilterSelected = false;
		},
	},
});

export const { applyFilter, dropFilters } = municipalitySlice.actions;

export default municipalitySlice.reducer;
