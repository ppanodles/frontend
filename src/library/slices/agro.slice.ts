import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {uniqBy} from 'lodash';

import {
	DateTimePickPayload,
	DateTimeRangePayload,
	ListSelectorPayload,
	RangePayload,
} from 'library/types/filterPayload.d';
import getDefaultRange from 'library/helpers/getDefaultRange';
import getDefaultDateRange from 'library/helpers/getDefaultDateRange';
import { LayoutType } from 'library/paths';
import AgroStateDataType from 'library/constants/AgroSlice';
import { IAgroState } from 'library/types/agro.d';
import ecoLocationStateMapper from 'library/mappers/agro.mapper';
import agroStateJSON from 'library/data/agro/agroState.data.json';
import { IFilterDataType } from 'library/types/system.d';
import FilterType from 'library/constants/FilterType';

const agroStateData: IAgroState[] = ecoLocationStateMapper(agroStateJSON.data);

export type Filters = {
  [AgroStateDataType.AGRO_STATE]: IFilterDataType<IAgroState>;
};

export type IEnableMultiSelect = {
  [key in LayoutType]?: boolean;
};

export type AgroState = {
  agroState: IAgroState[];
  filters: Filters;
};

type AgroFilterPayload =
  | ListSelectorPayload<AgroStateDataType.AGRO_STATE, keyof IAgroState>
  | DateTimeRangePayload<AgroStateDataType.AGRO_STATE, keyof IAgroState>
  | DateTimePickPayload<AgroStateDataType.AGRO_STATE, keyof IAgroState>
  | RangePayload<AgroStateDataType.AGRO_STATE, keyof IAgroState>;

const initialState: AgroState = {
	agroState: agroStateData,
	filters: {
		[AgroStateDataType.AGRO_STATE]: {
			[FilterType.DATE_TIME_RANGE]: {
				time: {
					type: FilterType.DATE_TIME_RANGE,
					field: 'time',
					name: 'Период времени',
					borders: getDefaultDateRange(agroStateData.map((v) => v.time)),
				},
			},
			[FilterType.LIST_SELECTOR]: {
				location: {
					type: FilterType.LIST_SELECTOR,
					field: 'location',
					name: 'Название станции',
					shouldShowAlways: true,
					items: uniqBy(
						agroStateData.filter((v) => v.location !== undefined),
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
					borders: getDefaultRange(agroStateData.map((v) => v.temp)),
					pepticColor: '#FFCC80',
				},
				pressure: {
					type: FilterType.RANGE,
					field: 'pressure',
					name: 'Давление',
					borders: getDefaultRange(agroStateData.map((v) => v.pressure)),
					pepticColor: '#8C9EFF',
				},
				humidity: {
					type: FilterType.RANGE,
					field: 'humidity',
					name: 'Влажность',
					borders: getDefaultRange(agroStateData.map((v) => v.humidity)),
					pepticColor: '#A5D6A7',
				},
				carbon: {
					type: FilterType.RANGE,
					field: 'carbon',
					name: 'Углерод',
					borders: getDefaultRange(agroStateData.map((v) => v.carbon)),
					pepticColor: '#84FFFF',
				},
			},
		},
	},
};

const agroSlice = createSlice({
	name: 'agro',
	initialState,
	reducers: {
		applyFilter(state, {
			payload: {
				filter, field, value, dataType,
			},
		}: PayloadAction<AgroFilterPayload>) {
			(state.filters[dataType] as any)[filter][field].selected = value;
		},
		dropFilterByField(state, { payload: { dataType, filter, field } }: PayloadAction<{dataType: AgroStateDataType, filter: FilterType, field: keyof IAgroState}>) {
			(state.filters[dataType] as any)[filter][field] = (initialState.filters[dataType] as any)[filter][field];
		},
		dropFilterByFilterType(state, { payload: { dataType, filter } }: PayloadAction<{dataType: AgroStateDataType, filter: FilterType }>) {
			(state.filters[dataType] as any)[filter] = (initialState.filters[dataType] as any)[filter];
		},
		dropFilterByDataType(state, { payload: { dataType } }: PayloadAction<{dataType: AgroStateDataType }>) {
			(state.filters[dataType] as any) = initialState.filters[dataType];
		},
		dropFilters(state) {
			state.filters = initialState.filters;
		},
	},
});

export const { applyFilter } = agroSlice.actions;

export default agroSlice.reducer;
