import React, { useMemo } from 'react';
import { Stack } from '@mui/material';
import Filter from 'library/components/Filter';
import FilterType from 'library/constants/FilterType';
import MarineFarmingDataType from 'library/constants/MarineFarmingSlice';
import { selectFilters } from 'library/selectors/filters.selector';
import { CommonFilterDataType } from 'library/types/system.d';
import { useDispatch, useSelector } from 'react-redux';
import { IMonitoringStation } from 'library/types/marineFarming.d';
import { applyFilter } from 'library/slices/marineFarming.slice';
import { useLocation } from 'react-router-dom';
import extractLayout from 'library/helpers/extractLayout';
import { LayoutType } from 'library/paths';

interface IProps {}

const MonitoringStationsFilter: React.FunctionComponent<IProps> = () => {
	const dispatch = useDispatch();
	const { pathname } = useLocation();
	const layout = useMemo(() => extractLayout(pathname), [pathname]);

	const filters: CommonFilterDataType<IMonitoringStation>[] = useSelector(selectFilters<IMonitoringStation>(MarineFarmingDataType.MONITORING_STATIONS));

	return (
		<Stack sx={{ width: '100%' }}>
			{filters.map((filter) => {
				if (filter.type === FilterType.SELECT_ONE && layout === LayoutType.CHARTS) {
					return (
						<Filter
							type={FilterType.SELECT_ONE}
							key={`${filter.name}_${filter.field}`}
							name={filter.name}
							values={filter.variants}
							checked={filter.selected}
							onChange={(value) => dispatch(applyFilter({
								dataType: MarineFarmingDataType.MONITORING_STATIONS,
								field: filter.field,
								filter: filter.type,
								value: {id: value.id, name: value.name},
							}))}
						/>
					);
				}
				if (filter.type === FilterType.LIST_SELECTOR && layout === LayoutType.MAP) {
					return (
						<Filter
							type={FilterType.LIST_SELECTOR}
							key={`${filter.name}_${filter.field}`}
							name={filter.name}
							values={filter.items}
							checked={filter.selected}
							onChange={(value) => dispatch(applyFilter({
								dataType: MarineFarmingDataType.MONITORING_STATIONS,
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

export default MonitoringStationsFilter;
