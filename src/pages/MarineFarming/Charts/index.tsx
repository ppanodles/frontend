import { Grid, Paper } from '@mui/material';
import React from 'react';
import getLayoutTypeFomPath from 'library/helpers/getLayoutTypeFomPath';
import { selectFirstEnableSlice } from 'library/slices/marineFarming.slice';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useMount } from 'react-use';
import EmissionValueChart from './EmissionValueChart';
import CommonDirty from './CommonDirty';
import Variance from './Variance';

interface IProps {}

const Charts: React.FunctionComponent<IProps> = () => {
	const dispatch = useDispatch();
	const { pathname } = useLocation();

	useMount(() => {
		dispatch(selectFirstEnableSlice(getLayoutTypeFomPath(pathname)));
	});

	return (

		<Grid container direction="row" ml={{xs: 1.5, md: 4}} mt={8} mr={1.5} mb={2} overflow="auto" columnSpacing={3}>
			<Grid item xs={8}>

				<Grid container direction="column" rowSpacing={3}>
					<Grid item xs={12}><EmissionValueChart /></Grid>

					<Grid item xs={12}>
						<Grid container direction="row" columnSpacing={3}>
							<Grid item xs={6}>
								<CommonDirty />
							</Grid>
							<Grid item xs={6}>
								<Variance />
							</Grid>
						</Grid>
					</Grid>

				</Grid>

			</Grid>
			<Grid item xs={4}><Paper sx={{ width: '100%', height: '100%' }} /></Grid>
		</Grid>
	);
};

export default Charts;
