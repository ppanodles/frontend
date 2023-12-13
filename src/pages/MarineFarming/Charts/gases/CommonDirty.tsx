import React from 'react';
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import {
	Box,
	Paper, Stack, Typography,
} from '@mui/material';

interface IProps {}

const CommonDirty: React.FunctionComponent<IProps> = () => {
	const series = [47, 53];

	const options: ApexOptions = {
		chart: {
			type: 'donut',
		},
		plotOptions: {
			pie: {
				donut: {
					size: '80%',
				},
			},
		},
		legend: {
			show: false,
		},
		dataLabels: {
			enabled: false,
		},
		colors: ['#00E5FF', '#06768D'],
		stroke: {
			show: false,
		},
		tooltip: {
			enabled: false,
		},
	};

	return (
		<Paper sx={{ py: 5, position: 'relative', height: '100%'}}>
			<Stack spacing={1} width="100%" height="100%" alignItems="center" justifyContent="center" mb={2}>
				<Typography sx={{ color: '#FFFBFF', position: 'absolute', top: 16 }} variant="h5">Общее загрязнение</Typography>
				<Box sx={{ position: 'relative'}}>
					<Typography
						sx={{
							color: '#FFFBFF', position: 'absolute', left: 'calc(50% - 3rem)', top: 'calc(50% - 1.6rem)', fontWeight: 700,
						}}
						variant="h3"
					>
						47%
					</Typography>
					<ReactApexChart options={options} series={series} type="donut" height={210} />
				</Box>
			</Stack>
		</Paper>
	);
};

export default CommonDirty;
