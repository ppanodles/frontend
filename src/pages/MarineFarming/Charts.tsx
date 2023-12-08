import { Box, Typography } from '@mui/material';
import getLayoutTypeFomPath from 'library/helpers/getLayoutTypeFomPath';
import { selectFirstEnableSlice } from 'library/slices/marineFarming.slice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useMount } from 'react-use';

interface IProps {}

const Charts: React.FunctionComponent<IProps> = () => {
	const dispatch = useDispatch();

	const { pathname } = useLocation();

	useMount(() => {
		dispatch(selectFirstEnableSlice(getLayoutTypeFomPath(pathname)));
	});

	return (<Box m={5}><Typography variant="h2" sx={{ color: (theme) => theme.palette.common.white }}>CHARTS</Typography></Box>);
};

export default Charts;
