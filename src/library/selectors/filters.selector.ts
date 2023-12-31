import MarineFarmingDataType from 'library/constants/MarineFarmingSlice';
import { CommonFilterDataType } from 'library/types/system.d';
import { RootState } from 'main/rootReducer';
import { createSelector } from 'reselect';
import {
	values, isEmpty, keys, pickBy,
} from 'lodash';
import getLayoutTypeFomPath from 'library/helpers/getLayoutTypeFomPath';
import AgroStateDataType from 'library/constants/AgroSlice';
import MunicipalityStateDataType from 'library/constants/MunicipalitySlice';

export const selectFilters = <T>(dataType: MarineFarmingDataType) => createSelector(
	(state: RootState) => state.marineFarming.filters[dataType],
	(filters) => {
		if (!isEmpty(filters)) {
			// @ts-ignore
			return values(filters).reduce((accumulator, current) => [
				...accumulator,
				...values(current),
			], [] as CommonFilterDataType<T>[]) as CommonFilterDataType<T>[];
		}

		return [] as CommonFilterDataType<T>[];
	},
);

export const selectAgroFilters = <T>(dataType: AgroStateDataType) => createSelector(
	(state: RootState) => state.agro.filters[dataType],
	(filters) => {
		if (!isEmpty(filters)) {
			// @ts-ignore
			return values(filters).reduce((accumulator, current) => [
				...accumulator,
				...values(current),
			], [] as CommonFilterDataType<T>[]) as CommonFilterDataType<T>[];
		}

		return [] as CommonFilterDataType<T>[];
	},
);

export const selectMunicipalityFilters = <T>(dataType: MunicipalityStateDataType) => createSelector(
	(state: RootState) => state.municipality.filters[dataType],
	(filters) => {
		if (!isEmpty(filters)) {
			// @ts-ignore
			return values(filters).reduce((accumulator, current) => [
				...accumulator,
				...values(current),
			], [] as CommonFilterDataType<T>[]) as CommonFilterDataType<T>[];
		}

		return [] as CommonFilterDataType<T>[];
	},
);

export const selectAccessibleSlices: (state: RootState, pathname: string) => MarineFarmingDataType[] = createSelector(
	[
		(state: RootState) => state.marineFarming.enableSlices,
		(_, pathname: string) => pathname,
	],
	(enableSlices, pathname) => {
		const currentLayout = getLayoutTypeFomPath(pathname);

		return currentLayout ? (keys(pickBy(enableSlices[currentLayout], Boolean)) as MarineFarmingDataType[]) : [];
	},
);

export const selectFilterStatuses: (state: RootState, pathname: string) => MarineFarmingDataType[] = createSelector(
	[
		(state: RootState) => state.marineFarming.slicesStatus,
		selectAccessibleSlices,
		(_, pathname: string) => pathname,
	],
	(slicesStatus, accessibleSlices) => (keys(pickBy(slicesStatus, Boolean)) as MarineFarmingDataType [])
		.filter((dataType) => accessibleSlices.includes(dataType)) as MarineFarmingDataType[],
);

/**
 * Для таблиц
 */
export const selectActiveSlice = createSelector(
	(state: RootState) => state.marineFarming.slicesStatus,
	(slicesStatus) => (keys(slicesStatus) as MarineFarmingDataType[]).find((slice: MarineFarmingDataType) => slicesStatus[slice] === true),
);
