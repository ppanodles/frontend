import React from 'react';
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

const Station: React.FunctionComponent<IProps> = ({ metal }) => {
	const theme = useTheme();

	return (
		<Stack sx={{
			position: 'relative',

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
						<div style={{width: `${metal.underworld}%`, height: '100%', backgroundColor: '#FF9315'}} />
					</Box>
				</Stack>

				<Stack direction="row" alignItems="center">
					<Typography variant="caption" sx={{ width: '20px', mr: 1, color: theme.palette.common.white }}>{metal.surface}</Typography>
					<Box sx={{ width: '100px', height: '16px' }}>
						<div style={{width: `${metal.surface}%`, height: '100%', backgroundColor: '#304FFE'}} />
					</Box>
				</Stack>

				<Stack direction="row" alignItems="center">
					<Typography variant="caption" sx={{ width: '20px', mr: 1, color: theme.palette.common.white }}>{metal.leap}</Typography>
					<Box sx={{ width: '100px', height: '16px' }}>
						<div style={{width: `${metal.leap}%`, height: '100%', backgroundColor: '#22C38E'}} />
					</Box>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default Station;
