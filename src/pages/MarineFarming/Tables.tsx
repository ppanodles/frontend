import { Box, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import getLayoutTypeFomPath from 'library/helpers/getLayoutTypeFomPath';
import selectFilteredShips from 'library/selectors/ships.selector';
import { selectFirstEnableSlice } from 'library/slices/marineFarming.slice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useMount } from 'react-use';

interface IProps {}

const Tables: React.FunctionComponent<IProps> = () => {
	const dispatch = useDispatch();

	const { pathname } = useLocation();

	useMount(() => {
		dispatch(selectFirstEnableSlice(getLayoutTypeFomPath(pathname)));
	});

	const test = useSelector(selectFilteredShips);

	return (
		<Stack mt={15} mx={2}>
			<Typography variant="h2" sx={{ color: (theme) => theme.palette.common.white }}>TABLES</Typography>
			{
				test.map((a, i) => (
					<Box key={a.id}>
						<Typography variant="h6" sx={{ color: 'white' }}>
							{`${i + 1}) ${a.id} | ${a.vesselName} ${dayjs(a.eta).format('DD/MM/YYYY')}`}
						</Typography>
					</Box>
				))
			}
		</Stack>
	);
};

export default Tables;
