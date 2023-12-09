import MarineFarmingDataType from 'library/constants/MarineFarmingSlice';
import { RootState } from 'main/rootReducer';
import { createSelector } from 'reselect';
import { values, isEmpty, keys } from 'lodash';
import dayjs from 'dayjs';
import FilterType from 'library/constants/FilterType';
import { IGreenhouseGases } from 'library/types/marineFarming.d';

const selectFilteredGases: (state: RootState) => IGreenhouseGases[] = createSelector(
	[
		(state: RootState) => state.marineFarming.filters[MarineFarmingDataType.GREENHOUSE_GASES],
		(state: RootState) => state.marineFarming.greenhouseGases,
		(state: RootState) => state.marineFarming.slicesStatus,
	],
	(filters, gases, slicesStatus) => {
		if (slicesStatus[MarineFarmingDataType.GREENHOUSE_GASES] === false) {
			return [];
		}

		const filterTypes = keys(filters) as FilterType[];

		return filterTypes.reduce((accumulator, currentValue: FilterType) => values(filters[currentValue]).reduce((accumulatedGases, currentFilter) => {
			if (!isEmpty(currentFilter.selected)) {
				if (currentFilter.type === FilterType.DATE_TIME_RANGE && Boolean(currentFilter.selected.from) && Boolean(currentFilter.selected.to)) {
					const dateFrom = dayjs(currentFilter.selected.from);
					const dateTo = dayjs(currentFilter.selected.to);

					if (dateFrom.isValid() && dateTo.isValid()) {
						return accumulatedGases.filter((gase) => {
							const interestingDate = dayjs(gase[currentFilter.field] as string);

							if (!interestingDate.isValid()) {
								return true;
							}

							return dateFrom.isSame(interestingDate) || dateTo.isSame(interestingDate) || (dateFrom.isBefore(interestingDate) && interestingDate.isBefore(dateTo));
						});
					}
				}

				if (currentFilter.type === FilterType.RANGE && currentFilter.selected.from !== undefined && currentFilter.selected.to !== undefined) {
					const { from, to } = currentFilter.selected;

					return accumulatedGases.filter((gase) => from <= (gase[currentFilter.field] as number) && (gase[currentFilter.field] as number) <= to);
				}
			}

			return accumulatedGases;
		}, accumulator), gases);
	},
);

export default selectFilteredGases;
