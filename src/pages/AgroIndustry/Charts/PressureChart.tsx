import {
	Paper, Stack, Typography, useTheme,
} from '@mui/material';
import React, { useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { IAgroState } from 'library/types/agro.d';

interface IProps {
	agroState: IAgroState[];
}

const getNameByAtmoTipe = (atmoType: string) => {
	switch (atmoType) {
	case 'temp':
		return 'Температура';
	case 'pressure':
		return 'Давление';
	case 'humidity':
		return 'Влажность';
	case 'carbon':
		return 'Углерод';
	default:
		return '';
	}
};

const HumidityChart: React.FunctionComponent<IProps> = ({ agroState }) => {
	const { palette } = useTheme();

	const chartData = useMemo(() => {
		const data = agroState.reduce((accumulator: any, currentValue: IAgroState) => ({
			...accumulator,
			pressure: accumulator.pressure ? [...accumulator.pressure, currentValue.pressure] : [currentValue.pressure],
			date: accumulator.date ? [...accumulator.date, currentValue.time] : [currentValue.time],
		}), {} as any);

		const series: { name: string, data: number[] }[] = Object.keys(data).reduce((accumulator, atmoTipe) => {
			if (atmoTipe === 'date') {
				return accumulator;
			}

			return [
				...accumulator,
				{
					name: getNameByAtmoTipe(atmoTipe),
					data: data[atmoTipe],
				},
			];
		}, [] as any);

		const options: ApexOptions = {
			chart: {
				type: 'line',
				zoom: {
					enabled: false,
				},
				toolbar: {
					show: false,
				},
			},
			colors: ['#304FFE'],
			dataLabels: {
				enabled: false,
			},
			stroke: {
				curve: 'straight',
				width: 2,
			},
			grid: {
				borderColor: '#FFFFFF14',
				xaxis: {
					lines: {
						show: true,
					},
				},
				yaxis: {
					lines: {
						show: true,
					},
				},
			},
			xaxis: {
				axisBorder: {
					show: false,
				},
				// даты
				categories: data.date,
				labels: {
					style: {
						colors: '#B8C0CC',
					},
				},
				axisTicks: {
					show: false,
				},
			},
			yaxis: {
				tickAmount: 4,
				min: Math.min(...data.pressure) - 50,
				max: Math.max(...data.pressure) + 50,
				labels: {
					formatter: (val) => Math.round(val).toString(),
					style: {
						colors: '#B8C0CC',
					},
				},
			},
			legend: {
				position: 'top',
				horizontalAlign: 'left',
				labels: {
					colors: palette.common.white,
				},
			},
		};

		return {series, options};
	}, [agroState, palette.common.white]);

	return (
		<Paper sx={{ p: 4, flex: 1}}>
			<Stack spacing={1} mb={2} pl={1.8}>
				<Typography sx={{ color: '#FFFBFF' }} variant="h5">Давление</Typography>
			</Stack>
			<ReactApexChart options={chartData.options} series={chartData.series} type="line" height="210%" />
		</Paper>
	);
};

export default HumidityChart;
