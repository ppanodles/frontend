import { RootState } from 'main/rootReducer';
import { createSelector } from 'reselect';
import { values, isEmpty, keys } from 'lodash';
import dayjs from 'dayjs';

import FilterType from 'library/constants/FilterType';
import MunicipalityStateDataType from 'library/constants/MunicipalitySlice';
import { IMunicipalityState } from 'library/types/municipality';

const selectFilteredMunicipalityStates: (state: RootState) => IMunicipalityState[] = createSelector(
	[
		(state: RootState) => state.municipality.filters[MunicipalityStateDataType.MUNICIPALITY_STATE],
		(state: RootState) => state.municipality.municipalityState,
	],
	(filters, MunicipalityStates) => {
		const filterTypes = keys(filters) as FilterType[];

		return filterTypes.reduce((accumulator, currentValue: FilterType) => values(filters[currentValue]).reduce((accumulatedMunicipalityStates, currentFilter) => {
			if (!isEmpty(currentFilter.selected)) {
				if (currentFilter.type === FilterType.LIST_SELECTOR) {
					if (!isEmpty(currentFilter.selected)) {
						return accumulatedMunicipalityStates
							.filter((municipalityState) => typeof municipalityState[currentFilter.field] === 'string' && values(currentFilter.selected).includes(municipalityState[currentFilter.field] as string));
					}
				}

				if (currentFilter.type === FilterType.DATE_TIME_RANGE && Boolean(currentFilter.selected.from) && Boolean(currentFilter.selected.to)) {
					const dateFrom = dayjs(currentFilter.selected.from);
					const dateTo = dayjs(currentFilter.selected.to);

					if (dateFrom.isValid() && dateTo.isValid()) {
						return accumulatedMunicipalityStates.filter((municipalityState) => {
							const interestingDate = dayjs(municipalityState[currentFilter.field] as string);

							if (!interestingDate.isValid()) {
								return true;
							}

							return dateFrom.isSame(interestingDate) || dateTo.isSame(interestingDate) || (dateFrom.isBefore(interestingDate) && interestingDate.isBefore(dateTo));
						});
					}
				}

				if (currentFilter.type === FilterType.RANGE && currentFilter.selected.from !== undefined && currentFilter.selected.to !== undefined) {
					const { from, to } = currentFilter.selected;

					return accumulatedMunicipalityStates.filter((municipalityState) => from <= (municipalityState[currentFilter.field] as number) && (municipalityState[currentFilter.field] as number) <= to);
				}
			}

			return accumulatedMunicipalityStates;
		}, accumulator), MunicipalityStates);
	},
);

export default selectFilteredMunicipalityStates;
