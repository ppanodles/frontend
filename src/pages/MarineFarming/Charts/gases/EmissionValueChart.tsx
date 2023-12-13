import {
	Paper, Stack, Typography, useTheme,
} from '@mui/material';
import React, { useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import dayjs from 'dayjs';
import { IGreenhouseGases } from 'library/types/marineFarming.d';

interface IProps {
	greenhouseGasesData: IGreenhouseGases[];
}

const EmissionValueChart: React.FunctionComponent<IProps> = ({ greenhouseGasesData }) => {
	const { palette } = useTheme();

	const chartData = useMemo(() => {
		const data: {[year: string]: IGreenhouseGases[]} = greenhouseGasesData.reduce((accumulator: any, currentValue: IGreenhouseGases) => {
			const year = dayjs(currentValue.time).year();

			return {
				...accumulator,
				[year]: accumulator[year] ? [...accumulator[year], currentValue] : [currentValue],
			};
		}, {} as any);

		const series: { name: string, data: number[] }[] = Object.keys(data).reduce((accumulator, year) => ([
			...accumulator,
			{
				name: year,
				data: data[year].map((greenhouseGases) => greenhouseGases.emissionValue),
			},
		]), [] as any);

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
				tickAmount: 10,
				axisBorder: {
					show: false,
				},
				// даты
				categories: Object.keys(data).reduce((accumulator, year) => {
					if (accumulator.length < data[year].length) {
						return data[year].map((greenhouseGases) => dayjs(greenhouseGases.time).format('DD/MM'));
					}

					return accumulator;
				}, [] as any),
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
				tickAmount: 8,
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
	}, [greenhouseGasesData, palette.common.white]);

	return (
		<Paper sx={{ p: 4, height: '100%' }}>
			<Stack spacing={1} mb={2} pl={1.8}>
				<Typography sx={{ color: '#FFFBFF' }} variant="h5">Значения эмиссии</Typography>
				<Typography sx={{ color: '#E9E9ED' }} variant="caption">Среднее значение эмиссии</Typography>
			</Stack>
			<ReactApexChart options={chartData.options} series={chartData.series} type="line" height={350} />
		</Paper>
	);
};

export default EmissionValueChart;
