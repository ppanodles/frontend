import React from 'react';
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { Paper, Stack, Typography } from '@mui/material';

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
		<Paper sx={{ py: 5, flex: 1, position: 'relative'}}>
			<Stack spacing={1} width="100%" alignItems="center" justifyContent="center" mb={2}>
				<Typography sx={{ color: '#FFFBFF' }} variant="h5">Общее загрязнение</Typography>
			</Stack>
			<Typography
				sx={{
					color: '#FFFBFF', position: 'absolute', left: 'calc(50% - 3rem)', top: 'calc(50% - 1.167rem)', fontWeight: 700,
				}}
				variant="h3"
			>
				47%
			</Typography>
			<ReactApexChart options={options} series={series} type="donut" height="150%" />

		</Paper>
	);
};

export default CommonDirty;
