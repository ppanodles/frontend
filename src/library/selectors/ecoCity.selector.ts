import { RootState } from 'main/rootReducer';
import { createSelector } from 'reselect';
import { values, isEmpty, keys } from 'lodash';
import dayjs from 'dayjs';

import FilterType from 'library/constants/FilterType';
import EcoCityStateDataType from 'library/constants/EcoCitySlice';
import { IEcoCityState } from 'library/types/ecoCity.d';

const selectFilteredEcoCityStates: (state: RootState) => IEcoCityState[] = createSelector(
	[
		(state: RootState) => state.ecoCity.filters[EcoCityStateDataType.CITY_STATE],
		(state: RootState) => state.ecoCity.ecoCityState,
	],
	(filters, EcoCityStates) => {
		const filterTypes = keys(filters) as FilterType[];

		return filterTypes.reduce((accumulator, currentValue: FilterType) => values(filters[currentValue]).reduce((accumulatedEcoCityStates, currentFilter) => {
			if (!isEmpty(currentFilter.selected)) {
				if (currentFilter.type === FilterType.LIST_SELECTOR) {
					if (!isEmpty(currentFilter.selected)) {
						return accumulatedEcoCityStates
							.filter((ecoCityState) => typeof ecoCityState[currentFilter.field] === 'string' && values(currentFilter.selected).includes(ecoCityState[currentFilter.field] as string));
					}
				}

				if (currentFilter.type === FilterType.DATE_TIME_RANGE && Boolean(currentFilter.selected.from) && Boolean(currentFilter.selected.to)) {
					const dateFrom = dayjs(currentFilter.selected.from);
					const dateTo = dayjs(currentFilter.selected.to);

					if (dateFrom.isValid() && dateTo.isValid()) {
						return accumulatedEcoCityStates.filter((ecoCityState) => {
							const interestingDate = dayjs(ecoCityState[currentFilter.field] as string);

							if (!interestingDate.isValid()) {
								return true;
							}

							return dateFrom.isSame(interestingDate) || dateTo.isSame(interestingDate) || (dateFrom.isBefore(interestingDate) && interestingDate.isBefore(dateTo));
						});
					}
				}

				if (currentFilter.type === FilterType.RANGE && currentFilter.selected.from !== undefined && currentFilter.selected.to !== undefined) {
					const { from, to } = currentFilter.selected;

					return accumulatedEcoCityStates.filter((ecoCityState) => from <= (ecoCityState[currentFilter.field] as number) && (ecoCityState[currentFilter.field] as number) <= to);
				}
			}

			return accumulatedEcoCityStates;
		}, accumulator), EcoCityStates);
	},
);

export default selectFilteredEcoCityStates;
