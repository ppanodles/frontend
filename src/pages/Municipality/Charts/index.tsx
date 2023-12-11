import { Grid } from '@mui/material';
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
		<Grid container direction="row" ml={{xs: 1.5, md: 4}} mt={8} mr={1.5} mb={2} overflow="auto" columnSpacing={2} rowSpacing={2}>
			<Grid item xs={12}><AtmosphericDataChart municipalityState={municipalityState} /></Grid>

			<Grid item xs={12}>
				<Grid container direction="row" columnSpacing={2} rowSpacing={2}>
					<Grid item xs={12} md={4}>
						<TempChart municipalityState={municipalityState} />
					</Grid>
					<Grid item xs={12} md={4}>
						<PressureChart municipalityState={municipalityState} />
					</Grid>
					<Grid item xs={12} md={4}>
						<HumidityChart municipalityState={municipalityState} />
					</Grid>
					<Grid item xs={12} md={4}>
						<CarbonChart municipalityState={municipalityState} />
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default Charts;
