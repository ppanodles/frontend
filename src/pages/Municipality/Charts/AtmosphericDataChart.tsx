import {
	Paper, Stack, Typography, useTheme,
} from '@mui/material';
import React, { useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { IMunicipalityState } from 'library/types/municipality.d';
import dayjs from 'dayjs';

interface IProps {
	municipalityState: IMunicipalityState[];
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

const AtmosphericDataChart: React.FunctionComponent<IProps> = ({ municipalityState }) => {
	const { palette } = useTheme();

	const chartData = useMemo(() => {
		const data = municipalityState.reduce((accumulator: any, currentValue: IMunicipalityState) => ({
			...accumulator,
			temp: accumulator.temp ? [...accumulator.temp, currentValue.temp] : [currentValue.temp],
			pressure: accumulator.pressure ? [...accumulator.pressure, currentValue.pressure] : [currentValue.pressure],
			humidity: accumulator.humidity ? [...accumulator.humidity, currentValue.humidity] : [currentValue.humidity],
			carbon: accumulator.carbon ? [...accumulator.carbon, currentValue.carbon] : [currentValue.carbon],
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
					formatter: (value) => dayjs(value).format('DD/MM/YYYY'),
					style: {
						colors: '#B8C0CC',
					},
				},
				axisTicks: {
					show: false,
				},
			},
			yaxis: {
				tickAmount: 10,
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
	}, [municipalityState, palette.common.white]);

	return (
		<Paper sx={{ p: 4, flex: 1}}>
			<Stack spacing={1} mb={2} pl={1.8}>
				<Typography sx={{ color: '#FFFBFF' }} variant="h5">Изменение атмосферных данных</Typography>
				<Typography sx={{ color: '#E9E9ED' }} variant="caption">
					Показания датчиков измерения температуры, давления, влажности и углерода для выбранной области
				</Typography>
			</Stack>
			<ReactApexChart options={chartData.options} series={chartData.series} type="line" height="80%" />
		</Paper>
	);
};

export default AtmosphericDataChart;
