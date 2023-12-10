import { Grid, Paper } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import selectFilteredMunicipalityStates from 'library/selectors/municipality.selector';
import AtmosphericDataChart from './AtmosphericDataChart';
import HumidityChart from './HumidityChart';
import TempChart from './TempChart';
import PressureChart from './PressureChart';
import CarbonChart from './CarbonChart';

interface IProps {}

const Charts: React.FunctionComponent<IProps> = () => {
	const municipalityState = useSelector(selectFilteredMunicipalityStates);

	return (
		<Grid container direction="row" ml={{xs: 1.5, md: 4}} mt={8} mr={1.5} mb={2} overflow="auto" columnSpacing={3}>
			<Grid item xs={8}>

				<Grid container direction="column" rowSpacing={3}>
					<Grid item xs={12}><AtmosphericDataChart municipalityState={municipalityState} /></Grid>

					<Grid item xs={12}>
						<Grid container direction="row" columnSpacing={3}>
							<Grid item xs={6}>
								<TempChart municipalityState={municipalityState} />
							</Grid>
							<Grid item xs={6}>
								<PressureChart municipalityState={municipalityState} />
							</Grid>
							<Grid item xs={6}>
								<HumidityChart municipalityState={municipalityState} />
							</Grid>
							<Grid item xs={6}>
								<CarbonChart municipalityState={municipalityState} />
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
