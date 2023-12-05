import { Stack } from '@mui/material';
import FilterType from 'library/constants/FilterType';
import React from 'react';
import { RootState } from 'main/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import MarineFarmingDataType from 'library/constants/MarineFarmingSlice';
import { values, isEmpty } from 'lodash';
import { IShip } from 'library/types/marineFarming.d';
import { CommonFilterDataType } from 'library/types/system.d';
import { applyFilter } from 'library/slices/marineFarming.slice';
import { createSelector } from 'reselect';
import Filter from 'library/components/Filter';

interface IProps {}

const selectFilters = createSelector(
	(state: RootState) => state.marineFarming.filters[MarineFarmingDataType.SHIPS],
	(shipsFilters) => {
		if (!isEmpty(shipsFilters)) {
			const filters = values(shipsFilters).reduce((accumulator, current) => [
				...accumulator,
				...values(current),
			], [] as CommonFilterDataType<IShip>[]);

			return filters;
		}

		return [];
	},
);

const ShipsFIlter: React.FunctionComponent<IProps> = () => {
	const dispatch = useDispatch();

	const filters = useSelector(selectFilters);

	return (
		<Stack sx={{ width: '100%' }}>
			{filters.map((filter) => {
				if (filter.type === FilterType.LIST_SELECTOR) {
					return (
						<Filter
							type={FilterType.LIST_SELECTOR}
							key={`${filter.name}_${filter.field}`}
							name={filter.name}
							values={filter.items}
							checked={filter.selected}
							onSelect={(value: {[key: string]: boolean}) => dispatch(applyFilter({
								dataType: MarineFarmingDataType.SHIPS,
								field: filter.field,
								filter: filter.type,
								value,
							}))}
						/>
					);
				}

				return null;
			})}
		</Stack>
	);
};

export default ShipsFIlter;
