import { RootState } from 'main/rootReducer';
import { createSelector } from 'reselect';
import { values, isEmpty, keys } from 'lodash';
import dayjs from 'dayjs';
import FilterType from 'library/constants/FilterType';
import { IEcoFarmlandState } from 'library/types/ecoFarmland';
import EcoFarmlandStateDataType from 'library/constants/EcoFarmlandSlice';

const selectFilteredEcoFarmlandStates: (state: RootState) => IEcoFarmlandState[] = createSelector(
	[
		(state: RootState) => state.ecoFarmland.filters[EcoFarmlandStateDataType.FARMLAND_STATE],
		(state: RootState) => state.ecoFarmland.ecoFarmlandState,
	],
	(filters, EcoFarmlandStates) => {
		const filterTypes = keys(filters) as FilterType[];

		return filterTypes.reduce((accumulator, currentValue: FilterType) => values(filters[currentValue]).reduce((accumulatedEcoFarmlandStates, currentFilter) => {
			if (!isEmpty(currentFilter.selected)) {
				if (currentFilter.type === FilterType.LIST_SELECTOR) {
					if (!isEmpty(currentFilter.selected)) {
						return accumulatedEcoFarmlandStates
							.filter((ecoFarmlandState) => typeof ecoFarmlandState[currentFilter.field] === 'string' && values(currentFilter.selected).includes(ecoFarmlandState[currentFilter.field] as string));
					}
				}

				if (currentFilter.type === FilterType.DATE_TIME_RANGE && Boolean(currentFilter.selected.from) && Boolean(currentFilter.selected.to)) {
					const dateFrom = dayjs(currentFilter.selected.from);
					const dateTo = dayjs(currentFilter.selected.to);

					if (dateFrom.isValid() && dateTo.isValid()) {
						return accumulatedEcoFarmlandStates.filter((ecoFarmlandState) => {
							const interestingDate = dayjs(ecoFarmlandState[currentFilter.field] as string);

							if (!interestingDate.isValid()) {
								return true;
							}

							return dateFrom.isSame(interestingDate) || dateTo.isSame(interestingDate) || (dateFrom.isBefore(interestingDate) && interestingDate.isBefore(dateTo));
						});
					}
				}

				if (currentFilter.type === FilterType.RANGE && currentFilter.selected.from !== undefined && currentFilter.selected.to !== undefined) {
					const { from, to } = currentFilter.selected;

					return accumulatedEcoFarmlandStates.filter((ecoFarmlandState) => from <= (ecoFarmlandState[currentFilter.field] as number) && (ecoFarmlandState[currentFilter.field] as number) <= to);
				}
			}

			return accumulatedEcoFarmlandStates;
		}, accumulator), EcoFarmlandStates);
	},
);

export default selectFilteredEcoFarmlandStates;
