import MarineFarmingDataType from 'library/constants/MarineFarmingSlice';
import { CommonFilterDataType } from 'library/types/system.d';
import { RootState } from 'main/rootReducer';
import { createSelector } from 'reselect';
import {
	values, isEmpty, keys, pickBy,
} from 'lodash';
import dayjs from 'dayjs';
import FilterType from 'library/constants/FilterType';

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

export const selectFilteredShips = createSelector(
	[
		(state: RootState) => state.marineFarming.filters[MarineFarmingDataType.SHIPS],
		(state: RootState) => state.marineFarming.ships,
	],
	(filters, ships) => {
		const filterTypes = keys(filters) as FilterType[];

		return filterTypes.reduce((accumulator, currentValue: FilterType) => values(filters[currentValue]).reduce((accumulatedShips, currentFilter) => {
			if (!isEmpty(currentFilter.selected)) {
				if (currentFilter.type === FilterType.LIST_SELECTOR) {
					const pickSelection = pickBy(currentFilter.selected, (v) => v === true);

					if (!isEmpty(pickSelection)) {
						return accumulatedShips
							.filter((ship) => typeof ship[currentFilter.field] === 'string' && keys(pickSelection).includes(ship[currentFilter.field] as string));
					}
				}

				if (currentFilter.type === FilterType.DATE_TIME_RANGE && Boolean(currentFilter.selected.from) && Boolean(currentFilter.selected.to)) {
					const dateFrom = dayjs(currentFilter.selected.from);
					const dateTo = dayjs(currentFilter.selected.to);

					if (dateFrom.isValid() && dateTo.isValid()) {
						return accumulatedShips.filter((ship) => {
							const interestingDate = dayjs(ship[currentFilter.field] as string);

							if (!interestingDate.isValid()) {
								return true;
							}

							return dateFrom.isSame(interestingDate) || dateTo.isSame(interestingDate) || (dateFrom.isBefore(interestingDate) && interestingDate.isBefore(dateTo));
						});
					}
				}

				if (currentFilter.type === FilterType.RANGE && currentFilter.selected.from !== undefined && currentFilter.selected.to !== undefined) {
					const { from, to } = currentFilter.selected;

					return accumulatedShips.filter((ship) => from <= (ship[currentFilter.field] as number) && (ship[currentFilter.field] as number) <= to);
				}
			}

			return accumulatedShips;
		}, accumulator), ships);
	},
);
