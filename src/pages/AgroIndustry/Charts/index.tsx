import { Grid } from '@mui/material';
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
		<Grid container direction="row" ml={{xs: 1.5, md: 4}} mt={8} mr={1.5} mb={2} overflow="auto" columnSpacing={2} rowSpacing={2}>
			<Grid item xs={12}><AtmosphericDataChart agroState={agroState} /></Grid>

			<Grid item xs={12}>
				<Grid container direction="row" columnSpacing={2} rowSpacing={2}>
					<Grid item xs={12} md={4}>
						<TempChart agroState={agroState} />
					</Grid>
					<Grid item xs={12} md={4}>
						<PressureChart agroState={agroState} />
					</Grid>
					<Grid item xs={12} md={4}>
						<HumidityChart agroState={agroState} />
					</Grid>
					<Grid item xs={12} md={4}>
						<CarbonChart agroState={agroState} />
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default Charts;
