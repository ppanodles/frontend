import MarineFarmingDataType from 'library/constants/MarineFarmingSlice';
import { RootState } from 'main/rootReducer';
import { createSelector } from 'reselect';
import { values, isEmpty, keys } from 'lodash';
import FilterType from 'library/constants/FilterType';
import { IMonitoringStation} from 'library/types/marineFarming.d';

const selectFilteredMonitoringStations: (state: RootState, ignorFilter: FilterType) => IMonitoringStation[] = createSelector(
	[
		(state: RootState) => state.marineFarming.filters[MarineFarmingDataType.MONITORING_STATIONS],
		(state: RootState) => state.marineFarming.monitoringStations,
		(state: RootState) => state.marineFarming.slicesStatus,
		(_, ignorFilter: FilterType) => ignorFilter,
	],
	(filters, stations, slicesStatus, ignorFilter) => {
		if (slicesStatus[MarineFarmingDataType.MONITORING_STATIONS] === false) {
			return [];
		}

		const filterTypes = keys(filters) as FilterType[];

		const filteredStations = filterTypes.reduce((accumulator, currentValue: FilterType) => values(filters[currentValue]).reduce((accumulatedMonitoringStations, currentFilter) => {
			if (!isEmpty(currentFilter.selected)) {
				if (currentFilter.type === FilterType.SELECT_ONE && ignorFilter !== FilterType.SELECT_ONE) {
					if (!isEmpty(currentFilter.selected)) {
						return accumulatedMonitoringStations
							.filter((station) => typeof station[currentFilter.field] === 'string' && values(currentFilter.selected).includes(station[currentFilter.field] as string));
					}
				}

				if (currentFilter.type === FilterType.LIST_SELECTOR && ignorFilter !== FilterType.LIST_SELECTOR) {
					if (!isEmpty(currentFilter.selected)) {
						return accumulatedMonitoringStations
							.filter((station) => typeof station[currentFilter.field] === 'string' && values(currentFilter.selected).includes(station[currentFilter.field] as string));
					}
				}
			}

			return accumulatedMonitoringStations;
		}, accumulator), stations);

		return !isEmpty(filteredStations) ? filteredStations : [stations[0]];
	},
);

export default selectFilteredMonitoringStations;
