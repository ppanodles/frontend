import React from 'react';
import { Stack } from '@mui/material';
import Filter from 'library/components/Filter';
import FilterType from 'library/constants/FilterType';
import {selectEcoCityFilters} from 'library/selectors/filters.selector';
import { CommonFilterDataType } from 'library/types/system.d';
import { useDispatch, useSelector } from 'react-redux';
import EcoCityStateDataType from 'library/constants/EcoCitySlice';
import { applyFilter } from 'library/slices/ecoCity.slice';
import { IEcoCityState } from 'library/types/ecoCity';

interface IProps {}

const CityFilter: React.FunctionComponent<IProps> = () => {
	const dispatch = useDispatch();

	const filters: CommonFilterDataType<IEcoCityState>[] = useSelector(selectEcoCityFilters<IEcoCityState>(EcoCityStateDataType.CITY_STATE));

	return (
		<Stack sx={{ width: '100%' }}>
			{filters.map((filter) => {
				if (filter.type === FilterType.DATE_TIME_RANGE) {
					return (
						<Filter
							type={FilterType.DATE_TIME_RANGE}
							key={`${filter.name}_${filter.field}`}
							name={filter.name}
							value={filter.selected}
							borders={filter.borders}
							onChange={(value) => dispatch(applyFilter({
								dataType: EcoCityStateDataType.CITY_STATE,
								field: filter.field,
								filter: filter.type,
								value,
							}))}
						/>
					);
				}
				if (filter.type === FilterType.LIST_SELECTOR) {
					return (
						<Filter
							type={FilterType.LIST_SELECTOR}
							key={`${filter.name}_${filter.field}`}
							name={filter.name}
							values={filter.items}
							checked={filter.selected}
							onChange={(value) => dispatch(applyFilter({
								dataType: EcoCityStateDataType.CITY_STATE,
								field: filter.field,
								filter: filter.type,
								value,
							}))}
						/>
					);
				}
				if (filter.type === FilterType.RANGE) {
					return (
						<Filter
							type={FilterType.RANGE}
							key={`${filter.name}_${filter.field}`}
							name={filter.name}
							value={filter.selected}
							borders={filter.borders}
							onChange={(value) => dispatch(applyFilter({
								dataType: EcoCityStateDataType.CITY_STATE,
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

export default CityFilter;
