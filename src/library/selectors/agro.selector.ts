import { RootState } from 'main/rootReducer';
import { createSelector } from 'reselect';
import { values, isEmpty, keys } from 'lodash';
import dayjs from 'dayjs';
import FilterType from 'library/constants/FilterType';
import { IAgroState } from 'library/types/agro.d';
import AgroStateDataType from 'library/constants/AgroSlice';

const selectFilteredAgroStates: (state: RootState) => IAgroState[] = createSelector(
	[
		(state: RootState) => state.agro.filters[AgroStateDataType.AGRO_STATE],
		(state: RootState) => state.agro.agroState,
	],
	(filters, AgroStates) => {
		const filterTypes = keys(filters) as FilterType[];

		return filterTypes.reduce((accumulator, currentValue: FilterType) => values(filters[currentValue]).reduce((accumulatedAgroStates, currentFilter) => {
			if (!isEmpty(currentFilter.selected)) {
				if (currentFilter.type === FilterType.LIST_SELECTOR) {
					if (!isEmpty(currentFilter.selected)) {
						return accumulatedAgroStates
							.filter((agroState) => typeof agroState[currentFilter.field] === 'string' && values(currentFilter.selected).includes(agroState[currentFilter.field] as string));
					}
				}

				if (currentFilter.type === FilterType.DATE_TIME_RANGE && Boolean(currentFilter.selected.from) && Boolean(currentFilter.selected.to)) {
					const dateFrom = dayjs(currentFilter.selected.from);
					const dateTo = dayjs(currentFilter.selected.to);

					if (dateFrom.isValid() && dateTo.isValid()) {
						return accumulatedAgroStates.filter((agroState) => {
							const interestingDate = dayjs(agroState[currentFilter.field] as string);

							if (!interestingDate.isValid()) {
								return true;
							}

							return dateFrom.isSame(interestingDate) || dateTo.isSame(interestingDate) || (dateFrom.isBefore(interestingDate) && interestingDate.isBefore(dateTo));
						});
					}
				}

				if (currentFilter.type === FilterType.RANGE && currentFilter.selected.from !== undefined && currentFilter.selected.to !== undefined) {
					const { from, to } = currentFilter.selected;

					return accumulatedAgroStates.filter((agroState) => from <= (agroState[currentFilter.field] as number) && (agroState[currentFilter.field] as number) <= to);
				}
			}

			return accumulatedAgroStates;
		}, accumulator), AgroStates);
	},
);

export default selectFilteredAgroStates;
