import React from 'react';
import getLayoutTypeFomPath from 'library/helpers/getLayoutTypeFomPath';
import { applyFilter, selectFirstEnableSlice, toggleSliceAccessibility } from 'library/slices/marineFarming.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useMount } from 'react-use';
import { selectActiveSlice } from 'library/selectors/filters.selector';
import MarineFarmingDataType from 'library/constants/MarineFarmingSlice';
import FilterType from 'library/constants/FilterType';
import GasesCharts from './gases';
import StationsCharts from './stations';

interface IProps {}

const Charts: React.FunctionComponent<IProps> = () => {
	const dispatch = useDispatch();

	const { pathname, state } = useLocation();

	useMount(() => {
		dispatch(selectFirstEnableSlice(getLayoutTypeFomPath(pathname)));

		if (state && state?.dataType && state.station) {
			dispatch(toggleSliceAccessibility({dataType: state.dataType, currentLayout: getLayoutTypeFomPath(pathname)}));
			dispatch(applyFilter({
				dataType: MarineFarmingDataType.MONITORING_STATIONS,
				field: 'id',
				filter: FilterType.SELECT_ONE,
				value: {id: state.station.id, name: state.station.name},
			}));
		}
	});

	const selectedSlice = useSelector(selectActiveSlice);

	if (selectedSlice === MarineFarmingDataType.GREENHOUSE_GASES) {
		return <GasesCharts />;
	}

	if (selectedSlice === MarineFarmingDataType.MONITORING_STATIONS) {
		return <StationsCharts />;
	}

	return null;
};

export default Charts;
