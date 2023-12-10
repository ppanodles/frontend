import React, { useMemo } from 'react';
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import {
	Box, LinearProgress, Paper, Stack, Typography,
} from '@mui/material';

import { IGreenhouseGases } from 'library/types/marineFarming.d';
import Icon from 'library/components/Icon';
import { IconNames } from 'resources/icons';
import { max, min } from 'lodash';

interface IProps {
    greenhouseGasesData: IGreenhouseGases[];
}

type ILevelsList = {
    icon: IconNames;
    color: string;
    from: number;
    to: number;
    perc: number;
 }

const getLevelsList = (minVal: number, maxVal: number): ILevelsList[] => [
	{
		icon: 'heap', color: '#880E4F', from: minVal - 1, to: 294.7, perc: 20,
	},
	{
		icon: 'heap', color: '#C2185B', from: 294.7, to: 612.2, perc: 45,
	},
	{
		icon: 'heap', color: '#DD2C00', from: 612.2, to: 1107.14, perc: 30,
	},
	{
		icon: 'heap', color: '#FF9100', from: 1107.14, to: 2082.9, perc: 25,
	},
	{
		icon: 'heap', color: '#FFC400', from: 2082.9, to: 5347.57, perc: 20,
	},
	{
		icon: 'heap', color: '#FFEB3B', from: 5347.57, to: maxVal + 1, perc: 15,
	},
];

const LevelsChart: React.FunctionComponent<IProps> = ({ greenhouseGasesData }) => {
	const levelsList: (ILevelsList & { count: number })[] = useMemo(() => {
		const emissionValues = greenhouseGasesData.map((gase) => gase.emissionValue);
		const minVal = min(emissionValues) ?? 0;
		const maxVal = max(emissionValues) ?? 0;

		return getLevelsList(minVal, maxVal)
			.reduce((accumulator, currentValue) => ([...accumulator, { ...currentValue, count: emissionValues.filter((val) => val >= currentValue.from && val < currentValue.to).length }]), [] as any);
	}, [greenhouseGasesData]);

	const options: ApexOptions = {
		chart: {
			type: 'donut',
		},
		plotOptions: {
			pie: {
				donut: {
					size: '70%',
				},
			},
		},
		legend: {
			show: false,
		},
		dataLabels: {
			enabled: true,
			style: {
				fontSize: '14px',
			},
		},
		colors: levelsList.map((level) => level.color),
		stroke: {
			show: false,
		},
		tooltip: {
			enabled: false,
		},
	};

	return (
		<Paper sx={{
			p: 4, position: 'relative',
		}}
		>
			<Stack sx={{ height: '100%' }}>
				<Stack width="100%" alignItems="start" justifyContent="center" mb={4}>
					<Typography sx={{ color: '#FFFBFF', mb: 1 }} variant="h5">Уровни эмиссии%</Typography>
					<Typography sx={{ color: '#FFFBFF' }} variant="body1">Процентное соотношение </Typography>
					<Typography sx={{ color: '#FFFBFF' }} variant="body1">за отчетный период</Typography>
				</Stack>
				<Stack direction="row" alignItems="center" justifyContent="center" spacing={3}>
					<ReactApexChart
						options={options}
						series={levelsList.map((level) => level.count)}
						type="donut"
						height="300rem"
					/>
					<Stack spacing={1}>
						{levelsList.map((level) => (
							<Stack key={level.color} direction="row" alignItems="center" justifyContent="start" spacing={2}>
								<Icon iconName={level.icon} sx={{ color: level.color}} />
								<Typography variant="body1" sx={{ color: '#E9E9ED' }}>
									{level.from}
									{' '}
									-
									{' '}
									{level.to}
								</Typography>
							</Stack>
						))}
					</Stack>
				</Stack>
				<Stack mt="auto">
					<Stack spacing={1} mb={6}>
						<Typography sx={{ color: '#FFFBFF' }} variant="h5">Изменение уровня эмиссии</Typography>
						<Typography sx={{ color: '#FFFBFF' }} variant="caption">Сравнение со среднестатистическими значениями</Typography>
					</Stack>

					<Stack spacing={3}>
						{levelsList.map((level) => (
							<Stack direction="row" alignItems="center">
								<Box sx={{ width: '100%', mr: 5 }}>
									<LinearProgress key={`${level.color}_${level.perc}`} variant="determinate" value={level.perc} sx={{ '.MuiLinearProgress-bar': { backgroundColor: level.color } }} />
								</Box>
								<Typography variant="body1" sx={{ color: '#C7C5D0' }}>{`${level.perc}%`}</Typography>
							</Stack>
						))}
					</Stack>

				</Stack>
			</Stack>
		</Paper>
	);
};

export default LevelsChart;
