import MarineFarmingDataType from 'library/constants/MarineFarmingSlice';
import { RootState } from 'main/rootReducer';
import { createSelector } from 'reselect';
import { values, isEmpty, keys } from 'lodash';
import dayjs from 'dayjs';
import FilterType from 'library/constants/FilterType';
import { IFilmContamination} from 'library/types/marineFarming.d';

const selectFilteredFilmContaminations: (state: RootState) => IFilmContamination[] = createSelector(
	[
		(state: RootState) => state.marineFarming.filters[MarineFarmingDataType.FILM_CONTAMINATION],
		(state: RootState) => state.marineFarming.filmContamination,
		(state: RootState) => state.marineFarming.slicesStatus,
	],
	(filters, films, slicesStatus) => {
		if (slicesStatus[MarineFarmingDataType.FILM_CONTAMINATION] === false) {
			return [];
		}

		const filterTypes = keys(filters) as FilterType[];

		return filterTypes.reduce((accumulator, currentValue: FilterType) => values(filters[currentValue]).reduce((accumulatedFilmContaminations, currentFilter) => {
			if (!isEmpty(currentFilter.selected)) {
				if (currentFilter.type === FilterType.DATE_TIME_RANGE && Boolean(currentFilter.selected.from) && Boolean(currentFilter.selected.to)) {
					const dateFrom = dayjs(currentFilter.selected.from);
					const dateTo = dayjs(currentFilter.selected.to);

					if (dateFrom.isValid() && dateTo.isValid()) {
						return accumulatedFilmContaminations.filter((film) => {
							const interestingDate = dayjs(film[currentFilter.field] as string);

							if (!interestingDate.isValid()) {
								return true;
							}

							return dateFrom.isSame(interestingDate) || dateTo.isSame(interestingDate) || (dateFrom.isBefore(interestingDate) && interestingDate.isBefore(dateTo));
						});
					}
				}

				if (currentFilter.type === FilterType.RANGE && currentFilter.selected.from !== undefined && currentFilter.selected.to !== undefined) {
					const { from, to } = currentFilter.selected;

					return accumulatedFilmContaminations.filter((film) => from <= (film[currentFilter.field] as number) && (film[currentFilter.field] as number) <= to);
				}
			}

			return accumulatedFilmContaminations;
		}, accumulator), films);
	},
);

export default selectFilteredFilmContaminations;
