import React, { useMemo } from 'react';
import {Paper, Stack, Typography} from '@mui/material';
import dayjs from 'dayjs';
import { max, min } from 'lodash';

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { IGreenhouseGases } from 'library/types/marineFarming.d';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
);

interface IProps {
	greenhouseGasesData: IGreenhouseGases[]
}

interface ITableData {
	data: number[];
	categories: string[];
	min: number;
	max: number;
	average: number;
}

const calculateAverage = (array: number[]) => array.reduce((a, b) => a + b) / array.length;

const calculateDeviation = (array: number[], average: number) => array.map((value) => value - average);

const Variance: React.FunctionComponent<IProps> = ({ greenhouseGasesData }) => {
	const tableData: ITableData = useMemo(() => {
		const valuesAndDates: { data: number[], categories: string[] } = greenhouseGasesData
			.reduce((accumulator, greenhouseGases) => ({
				data: accumulator.data ? [...accumulator.data, Math.round(greenhouseGases.emissionValue)] : [Math.round(greenhouseGases.emissionValue)],
				categories: accumulator.categories ? [...accumulator.categories, dayjs(greenhouseGases.time).format('DD/MM')] : [dayjs(greenhouseGases.time).format('DD/MM')],
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

	const data = {
		labels: tableData.categories,
		borderWidth: 1,
		base: tableData.average,
		datasets: [{
			data: tableData.data,
			backgroundColor: (a: any) => (a.raw > 0 ? '#20746C' : '#0D7D89'),
			borderWidth: 1,
			borderRadius: 5,
			base: 100,
		}],
	};

	return (
		<Paper sx={{ p: 4, flex: 1}}>
			<Stack spacing={1} mb={2} pl={1.8}>
				<Typography sx={{ color: '#FFFBFF' }} variant="h5">Отклонение  от среднего значения</Typography>
			</Stack>
			<Bar
				options={{
					responsive: true,
					scales: {
						x: {
							border: {
								display: false,
							},
							grid: {
								display: false, // Disable grid lines
							},
						},
						y: {
							border: {
								display: false,
							},
							grid: {
								color: '#FFFFFF14',
							},
						},
					},
					plugins: {
						legend: {
							display: false,
						},
						tooltip: {
							enabled: false,
						},
						title: {
							display: false,
						},
					},
				}}
				data={data}
			/>
		</Paper>
	);
};

export default Variance;
