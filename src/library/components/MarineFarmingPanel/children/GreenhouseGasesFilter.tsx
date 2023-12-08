import React from 'react';
import { Stack } from '@mui/material';
import Filter from 'library/components/Filter';
import FilterType from 'library/constants/FilterType';
import MarineFarmingDataType from 'library/constants/MarineFarmingSlice';
import {selectFilters} from 'library/selectors/filters.selector';
import { CommonFilterDataType } from 'library/types/system.d';
import { useDispatch, useSelector } from 'react-redux';
import { IGreenhouseGases } from 'library/types/marineFarming.d';
import { applyFilter } from 'library/slices/marineFarming.slice';

interface IProps {}

const GreenhouseGasesFilter: React.FunctionComponent<IProps> = () => {
	const dispatch = useDispatch();

	const filters: CommonFilterDataType<IGreenhouseGases>[] = useSelector(selectFilters<IGreenhouseGases>(MarineFarmingDataType.GREENHOUSE_GASES));

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
							onChange={(value) => dispatch(applyFilter({
								dataType: MarineFarmingDataType.GREENHOUSE_GASES,
								field: filter.field,
								filter: filter.type,
								value,
							}))}
						/>
					);
				}

				if (filter.type === FilterType.DATE_TIME_RANGE) {
					return (
						<Filter
							type={FilterType.DATE_TIME_RANGE}
							key={`${filter.name}_${filter.field}`}
							name={filter.name}
							value={filter.selected}
							borders={filter.borders}
							onChange={(value) => dispatch(applyFilter({
								dataType: MarineFarmingDataType.GREENHOUSE_GASES,
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
								dataType: MarineFarmingDataType.GREENHOUSE_GASES,
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

export default GreenhouseGasesFilter;
