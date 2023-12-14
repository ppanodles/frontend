import {
	Box,
	Container, Stack, useTheme,
} from '@mui/material';
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
	const theme = useTheme();

	const municipalityState = useSelector(selectFilteredMunicipalityStates);

	return (
		<Container
			sx={{
				mt: 8,
				overflow: 'auto',
				'&::-webkit-scrollbar': {
					width: '0.3rem',
					height: '0.3rem',
				},

				'&::-webkit-scrollbar-thumb': {
					borderRadius: '8px',
					backgroundColor: '#46464F',
				},
				'&::-webkit-scrollbar-corner': {
					backgroundColor: theme.palette.background.paper,
				},
			}}
			maxWidth={false}
		>
			<Stack>
				<Box sx={{ height: {xs: '80vh', md: '55vh'}, display: 'flex' }}>
					<AtmosphericDataChart municipalityState={municipalityState} />
				</Box>
				<Stack
					direction={{ xs: 'column', md: 'row' }}
					spacing={{ xs: 13, md: 2 }}
					sx={{ mt: 3 }}
				>
					<Box sx={{ width: {xs: '99%', md: '25%'}, height: 160 }}>
						<TempChart municipalityState={municipalityState} />
					</Box>

					<Box sx={{width: {xs: '99%', md: '25%'}, height: 160 }}>
						<PressureChart municipalityState={municipalityState} />
					</Box>

					<Box sx={{ width: {xs: '99%', md: '25%'}, height: 160 }}>
						<HumidityChart municipalityState={municipalityState} />
					</Box>

					<Box sx={{ width: {xs: '99%', md: '25%'}, height: 160 }}>
						<CarbonChart municipalityState={municipalityState} />
					</Box>
				</Stack>
			</Stack>
		</Container>
	);
};

export default Charts;
