import MarineFarmingDataType from 'library/constants/MarineFarmingSlice';
import { CommonFilterDataType } from 'library/types/system.d';
import { RootState } from 'main/rootReducer';
import { createSelector } from 'reselect';
import { values, isEmpty } from 'lodash';

const selectFilters = <T>(dataType: MarineFarmingDataType) => createSelector(
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

export default selectFilters;
