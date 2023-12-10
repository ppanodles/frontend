import { Grid, Paper } from '@mui/material';
import React from 'react';
import selectFilteredAgroStates from 'library/selectors/agro.selector';
import { useSelector } from 'react-redux';
import AtmosphericDataChart from './AtmosphericDataChart';
import HumidityChart from './HumidityChart';
import TempChart from './TempChart';
import PressureChart from './PressureChart';
import CarbonChart from './CarbonChart';

interface IProps {}

const Charts: React.FunctionComponent<IProps> = () => {
	const agroState = useSelector(selectFilteredAgroStates);

	return (
		<Grid container direction="row" ml={{xs: 1.5, md: 4}} mt={8} mr={1.5} mb={2} overflow="auto" columnSpacing={3}>
			<Grid item xs={8}>

				<Grid container direction="column" rowSpacing={3}>
					<Grid item xs={12}><AtmosphericDataChart agroState={agroState} /></Grid>

					<Grid item xs={12}>
						<Grid container direction="row" columnSpacing={3}>
							<Grid item xs={6}>
								<TempChart agroState={agroState} />
							</Grid>
							<Grid item xs={6}>
								<PressureChart agroState={agroState} />
							</Grid>
							<Grid item xs={6}>
								<HumidityChart agroState={agroState} />
							</Grid>
							<Grid item xs={6}>
								<CarbonChart agroState={agroState} />
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
