import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ecoLocationStateMapper from 'library/mappers/ecoFarmland.mapper';
import ecoCityStateJSON from 'library/data/marineFarming/ecoCityState.data.json';
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
import EcoCityStateDataType from 'library/constants/EcoCitySlice';
import { IEcoCityState } from 'library/types/ecoCity';

const ecoCityStateData: IEcoCityState[] = ecoLocationStateMapper(ecoCityStateJSON.data);

export type Filters = {
  [EcoCityStateDataType.CITY_STATE]: IFilterDataType<IEcoCityState>;
};

export type IEnableMultiSelect = {
  [key in LayoutType]?: boolean;
};

export type EcoCityState = {
  ecoCityState: IEcoCityState[];
  filters: Filters;
};

type EcoCityFilterPayload =
  | ListSelectorPayload<EcoCityStateDataType.CITY_STATE, keyof IEcoCityState>
  | DateTimeRangePayload<EcoCityStateDataType.CITY_STATE, keyof IEcoCityState>
  | DateTimePickPayload<EcoCityStateDataType.CITY_STATE, keyof IEcoCityState>
  | RangePayload<EcoCityStateDataType.CITY_STATE, keyof IEcoCityState>;

const initialState: EcoCityState = {
	ecoCityState: ecoCityStateData,
	filters: {
		[EcoCityStateDataType.CITY_STATE]: {
			[FilterType.DATE_TIME_RANGE]: {
				time: {
					type: FilterType.DATE_TIME_RANGE,
					field: 'time',
					name: 'Период времени',
					borders: getDefaultDateRange(ecoCityStateData.map((v) => v.time)),
				},
			},
			[FilterType.LIST_SELECTOR]: {
				location: {
					type: FilterType.LIST_SELECTOR,
					field: 'location',
					name: 'Муниципалитет',
					shouldShowAlways: true,
					items: uniqBy(
						ecoCityStateData.filter((v) => v.location !== undefined),
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
					borders: getDefaultRange(ecoCityStateData.map((v) => v.temp)),
				},
				pressure: {
					type: FilterType.RANGE,
					field: 'pressure',
					name: 'Давление',
					borders: getDefaultRange(ecoCityStateData.map((v) => v.pressure)),
				},
				humidity: {
					type: FilterType.RANGE,
					field: 'humidity',
					name: 'Давление',
					borders: getDefaultRange(ecoCityStateData.map((v) => v.humidity)),
				},
				carbon: {
					type: FilterType.RANGE,
					field: 'carbon',
					name: 'Углерод',
					borders: getDefaultRange(ecoCityStateData.map((v) => v.carbon)),
				},
			},
		},
	},
};

const ecoCitySlice = createSlice({
	name: 'eco-city',
	initialState,
	reducers: {
		applyFilter(state, {
			payload: {
				filter, field, value, dataType,
			},
		}: PayloadAction<EcoCityFilterPayload>) {
			(state.filters[dataType] as any)[filter][field].selected = value;
		},
		dropFilterByField(state, { payload: { dataType, filter, field } }: PayloadAction<{dataType: EcoCityStateDataType, filter: FilterType, field: keyof IEcoCityState}>) {
			(state.filters[dataType] as any)[filter][field] = (initialState.filters[dataType] as any)[filter][field];
		},
		dropFilterByFilterType(state, { payload: { dataType, filter } }: PayloadAction<{dataType: EcoCityStateDataType, filter: FilterType }>) {
			(state.filters[dataType] as any)[filter] = (initialState.filters[dataType] as any)[filter];
		},
		dropFilterByDataType(state, { payload: { dataType } }: PayloadAction<{dataType: EcoCityStateDataType }>) {
			(state.filters[dataType] as any) = initialState.filters[dataType];
		},
		dropFilters(state) {
			state.filters = initialState.filters;
		},
	},
});

export const { applyFilter } = ecoCitySlice.actions;

export default ecoCitySlice.reducer;
