import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useMount } from 'react-use';

import { selectActiveSlice } from 'library/selectors/filters.selector';
import MarineFarmingDataType from 'library/constants/MarineFarmingSlice';
import getLayoutTypeFomPath from 'library/helpers/getLayoutTypeFomPath';
import { selectFirstEnableSlice } from 'library/slices/marineFarming.slice';

import GreenhouseGasesTable from './GreenhouseGasesTable';
import ShipsTable from './ShipsTable';

interface IProps {}

const Tables: React.FunctionComponent<IProps> = () => {
	const dispatch = useDispatch();

	const { pathname } = useLocation();

	useMount(() => {
		dispatch(selectFirstEnableSlice(getLayoutTypeFomPath(pathname)));
	});

	const selectedSlice = useSelector(selectActiveSlice);

	if (selectedSlice === MarineFarmingDataType.SHIPS) {
		return <ShipsTable />;
	}

	if (selectedSlice === MarineFarmingDataType.GREENHOUSE_GASES) {
		return <GreenhouseGasesTable />;
	}

	return null;
};

export default Tables;
