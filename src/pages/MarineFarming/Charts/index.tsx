import { Grid } from '@mui/material';
import React from 'react';
import getLayoutTypeFomPath from 'library/helpers/getLayoutTypeFomPath';
import { selectFirstEnableSlice } from 'library/slices/marineFarming.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useMount } from 'react-use';
import selectFilteredGases from 'library/selectors/gases.selector';
import { isEmpty } from 'lodash';
import EmissionValueChart from './EmissionValueChart';
import CommonDirty from './CommonDirty';
import Variance from './Variance';
import LevelsChart from './LevelsChart';

interface IProps {}

const Charts: React.FunctionComponent<IProps> = () => {
	const dispatch = useDispatch();
	const { pathname } = useLocation();

	useMount(() => {
		dispatch(selectFirstEnableSlice(getLayoutTypeFomPath(pathname)));
	});

	const greenhouseGasesData = useSelector(selectFilteredGases);

	if (isEmpty(greenhouseGasesData)) {
		return null;
	}

	return (
		<Grid container direction="row" ml={{xs: 0, md: 4}} mt={8} mr={2} mb={2} overflow="auto" columnSpacing={3}>
			<Grid item xs={12} lg={7}>

				<Grid container direction="column" rowSpacing={3}>
					<Grid item xs={12}><EmissionValueChart greenhouseGasesData={greenhouseGasesData} /></Grid>

					<Grid item xs={12}>
						<Grid container direction="row" columnSpacing={3}>
							<Grid item xs={12} md={4}>
								<CommonDirty />
							</Grid>
							<Grid item xs={12} md={8}>
								<Variance greenhouseGasesData={greenhouseGasesData} />
							</Grid>
						</Grid>
					</Grid>

				</Grid>

			</Grid>
			<Grid item xs={12} md={5}>
				<LevelsChart greenhouseGasesData={greenhouseGasesData} />
			</Grid>
		</Grid>
	);
};

export default Charts;
