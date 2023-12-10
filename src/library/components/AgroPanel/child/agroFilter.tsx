import React from 'react';
import { Stack } from '@mui/material';
import Filter from 'library/components/Filter';
import FilterType from 'library/constants/FilterType';
import {selectAgroFilters} from 'library/selectors/filters.selector';
import { CommonFilterDataType } from 'library/types/system.d';
import { useDispatch, useSelector } from 'react-redux';
import AgroStateDataType from 'library/constants/AgroSlice';
import { applyFilter } from 'library/slices/agro.slice';
import { IAgroState } from 'library/types/agro';

interface IProps {}

const AgroFilter: React.FunctionComponent<IProps> = () => {
	const dispatch = useDispatch();

	const filters: CommonFilterDataType<IAgroState>[] = useSelector(selectAgroFilters<IAgroState>(AgroStateDataType.AGRO_STATE));

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
								dataType: AgroStateDataType.AGRO_STATE,
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
								dataType: AgroStateDataType.AGRO_STATE,
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
								dataType: AgroStateDataType.AGRO_STATE,
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

export default AgroFilter;
