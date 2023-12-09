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
import EcoFarmlandStateDataType from 'library/constants/EcoFarmlandSlice';
import { IEcoFarmlandState } from 'library/types/ecoFarmland.d';
import ecoLocationStateMapper from 'library/mappers/ecoFarmland.mapper';
import ecoFarmlandStateJSON from 'library/data/marineFarming/ecoFarmlandState.data.json';
import { IFilterDataType } from 'library/types/system.d';
import FilterType from 'library/constants/FilterType';

const ecoFarmlandStateData: IEcoFarmlandState[] = ecoLocationStateMapper(ecoFarmlandStateJSON.data);

export type Filters = {
  [EcoFarmlandStateDataType.FARMLAND_STATE]: IFilterDataType<IEcoFarmlandState>;
};

export type IEnableMultiSelect = {
  [key in LayoutType]?: boolean;
};

export type EcoFarmlandState = {
  ecoFarmlandState: IEcoFarmlandState[];
  filters: Filters;
};

type EcoFarmlandFilterPayload =
  | ListSelectorPayload<EcoFarmlandStateDataType.FARMLAND_STATE, keyof IEcoFarmlandState>
  | DateTimeRangePayload<EcoFarmlandStateDataType.FARMLAND_STATE, keyof IEcoFarmlandState>
  | DateTimePickPayload<EcoFarmlandStateDataType.FARMLAND_STATE, keyof IEcoFarmlandState>
  | RangePayload<EcoFarmlandStateDataType.FARMLAND_STATE, keyof IEcoFarmlandState>;

const initialState: EcoFarmlandState = {
	ecoFarmlandState: ecoFarmlandStateData,
	filters: {
		[EcoFarmlandStateDataType.FARMLAND_STATE]: {
			[FilterType.DATE_TIME_RANGE]: {
				time: {
					type: FilterType.DATE_TIME_RANGE,
					field: 'time',
					name: 'Период времени',
					borders: getDefaultDateRange(ecoFarmlandStateData.map((v) => v.time)),
				},
			},
			[FilterType.LIST_SELECTOR]: {
				location: {
					type: FilterType.LIST_SELECTOR,
					field: 'location',
					name: 'Название станции',
					shouldShowAlways: true,
					items: uniqBy(
						ecoFarmlandStateData.filter((v) => v.location !== undefined),
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
					borders: getDefaultRange(ecoFarmlandStateData.map((v) => v.temp)),
				},
				pressure: {
					type: FilterType.RANGE,
					field: 'pressure',
					name: 'Давление',
					borders: getDefaultRange(ecoFarmlandStateData.map((v) => v.pressure)),
				},
				humidity: {
					type: FilterType.RANGE,
					field: 'humidity',
					name: 'Давление',
					borders: getDefaultRange(ecoFarmlandStateData.map((v) => v.humidity)),
				},
				carbon: {
					type: FilterType.RANGE,
					field: 'carbon',
					name: 'Углерод',
					borders: getDefaultRange(ecoFarmlandStateData.map((v) => v.carbon)),
				},
			},
		},
	},
};

const ecoFarmlandSlice = createSlice({
	name: 'eco-farmland',
	initialState,
	reducers: {
		applyFilter(state, {
			payload: {
				filter, field, value, dataType,
			},
		}: PayloadAction<EcoFarmlandFilterPayload>) {
			(state.filters[dataType] as any)[filter][field].selected = value;
		},
		dropFilterByField(state, { payload: { dataType, filter, field } }: PayloadAction<{dataType: EcoFarmlandStateDataType, filter: FilterType, field: keyof IEcoFarmlandState}>) {
			(state.filters[dataType] as any)[filter][field] = (initialState.filters[dataType] as any)[filter][field];
		},
		dropFilterByFilterType(state, { payload: { dataType, filter } }: PayloadAction<{dataType: EcoFarmlandStateDataType, filter: FilterType }>) {
			(state.filters[dataType] as any)[filter] = (initialState.filters[dataType] as any)[filter];
		},
		dropFilterByDataType(state, { payload: { dataType } }: PayloadAction<{dataType: EcoFarmlandStateDataType }>) {
			(state.filters[dataType] as any) = initialState.filters[dataType];
		},
		dropFilters(state) {
			state.filters = initialState.filters;
		},
	},
});

export const { applyFilter } = ecoFarmlandSlice.actions;

export default ecoFarmlandSlice.reducer;
