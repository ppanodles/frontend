import React, { useMemo } from 'react';
import {
	Box,
	Stack,
	Typography,
	useTheme,
} from '@mui/material';
import { IMetal } from 'library/types/marineFarming.d';

interface IProps {
    metal: IMetal;
}

const getLineWidth = (value: number, max: number) => (value / (max * 1.1)) * 100;

const Station: React.FunctionComponent<IProps> = ({ metal }) => {
	const theme = useTheme();

	const maxValue = useMemo(() => Math.max(metal.underworld, metal.surface, metal.leap), [metal.leap, metal.surface, metal.underworld]);

	return (
		<Stack sx={{
			position: 'relative',

			'&::before': {
				content: '""',
				position: 'absolute',
				right: 0,
				left: 0,
				bottom: -14,
				borderBottom: '1px solid #41414F',
			},
			'&::after': {
				content: '""',
				position: 'absolute',
				width: '1px',
				top: 8,
				bottom: 8,
				right: 0,
				backgroundColor: '#41414F',
			},
		}}
		>
			<Box>
				<Typography variant="h6" sx={{ color: theme.palette.common.white }}>{metal.name}</Typography>
				<Typography variant="caption" sx={{ color: theme.palette.common.white }}>{metal.label}</Typography>
			</Box>

			<Stack spacing={2} mt={4}>
				<Stack direction="row" alignItems="center">
					<Typography variant="caption" sx={{ width: '20px', mr: 1, color: theme.palette.common.white }}>{metal.underworld}</Typography>
					<Box sx={{ width: '100px', height: '16px' }}>
						<div style={{width: `${getLineWidth(metal.underworld, maxValue)}%`, height: '100%', backgroundColor: '#FF9315'}} />
					</Box>
				</Stack>

				<Stack direction="row" alignItems="center">
					<Typography variant="caption" sx={{ width: '20px', mr: 1, color: theme.palette.common.white }}>{metal.surface}</Typography>
					<Box sx={{ width: '100px', height: '16px' }}>
						<div style={{width: `${getLineWidth(metal.surface, maxValue)}%`, height: '100%', backgroundColor: '#304FFE'}} />
					</Box>
				</Stack>

				<Stack direction="row" alignItems="center">
					<Typography variant="caption" sx={{ width: '20px', mr: 1, color: theme.palette.common.white }}>{metal.leap}</Typography>
					<Box sx={{ width: '100px', height: '16px' }}>
						<div style={{width: `${getLineWidth(metal.leap, maxValue)}%`, height: '100%', backgroundColor: '#22C38E'}} />
					</Box>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default Station;
