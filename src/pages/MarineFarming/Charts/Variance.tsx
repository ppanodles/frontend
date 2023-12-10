import {
	Paper, Stack, Typography, useTheme,
} from '@mui/material';
import React, { useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { ApexOptions } from 'apexcharts';
import selectFilteredGases from 'library/selectors/gases.selector';
import dayjs from 'dayjs';
import { IGreenhouseGases } from 'library/types/marineFarming.d';
import { max, min } from 'lodash';

interface IProps {}

const calculateAverage = (array: number[]) => array.reduce((a, b) => a + b) / array.length;

const calculateDeviation = (array: number[], average: number) => array.map((value) => value - average);

const Variance: React.FunctionComponent<IProps> = () => {
	const { palette } = useTheme();

	const greenhouseGasesData = useSelector(selectFilteredGases);

	const tableData: { data: number[], categories: string[], min: number, max: number, average: number } = useMemo(() => {
		const valuesAndDates: { data: number[], categories: string[] } = greenhouseGasesData.reduce((accumulator, greenhouseGases) => ({
			data: accumulator.data ? [...accumulator.data, Math.round(greenhouseGases.emissionValue)] : [Math.round(greenhouseGases.emissionValue)],
			categories: accumulator.categories ? [...accumulator.categories, dayjs(greenhouseGases.time).format('YYYY-MM-DD')] : [dayjs(greenhouseGases.time).format('YYYY-MM-DD')],
		}), {} as any);

		const average = Math.round(calculateAverage(valuesAndDates.data));

		const emissionsVariance = calculateDeviation(valuesAndDates.data, average);
		const minVariance = min(emissionsVariance);
		const maxVariance = max(emissionsVariance);

		return {
			data: emissionsVariance,
			categories: valuesAndDates.categories,
			min: minVariance ?? 0,
			max: maxVariance ?? 0,
			average,
		};
	}, [greenhouseGasesData]);

	const series = [{
		data: calculateDeviation(tableData.data, calculateAverage(tableData.data)),
	}];

	console.log(tableData);

	const options: ApexOptions = {
		chart: {
			type: 'bar',
			zoom: {
				enabled: false,
			},
			toolbar: {
				show: false,
			},
		},
		plotOptions: {
			bar: {
				colors: {
					ranges: [{
						from: tableData.min - 10,
						to: tableData.average + 1,
						color: '#0D7D89',
					}, {
						from: tableData.average,
						to: tableData.max + 10,
						color: '#20746C',
					}],
				},
				columnWidth: '26px',
				borderRadius: 2,
			},
		},
		dataLabels: {
			enabled: false,
		},
		grid: {
			borderColor: '#FFFFFF14',
			xaxis: {
				lines: {
					show: false,
				},
			},
			yaxis: {
				lines: {
					show: true,
				},
			},
		},
		yaxis: {
			tickAmount: 20,
			min: tableData.min - 100,
			max: tableData.max - 100,

			labels: {
				formatter: (y) => y.toFixed(0),
				style: {
					colors: '#B8C0CC',
				},
			},
		},
		xaxis: {
			type: 'datetime',
			tickAmount: 10,
			labels: {
				formatter: (val) => dayjs(val).format('DD'),
				style: {
					colors: '#B8C0CC',
				},
			},
			categories: tableData.categories,
			axisBorder: {
				show: false,
			},
			axisTicks: {
				show: false,
			},
		},
	};

	return (
		<Paper sx={{ p: 4, flex: 1}}>
			<Stack spacing={1} mb={2} pl={1.8}>
				<Typography sx={{ color: '#FFFBFF' }} variant="h5">Отклонение  от среднего значения</Typography>
			</Stack>
			{/* <ReactApexChart options={options} series={series} type="bar" /> */}
		</Paper>
	);
};

export default Variance;
