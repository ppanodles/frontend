import React from 'react';
import { isMobile } from 'react-device-detect';

import Icon from 'library/components/Icon';
import {
	Box, Fab, Modal, Stack, Typography,
} from '@mui/material';

const levelsList = [
	{
		icon: 'heap', color: '#FFEB3B', from: 4.712, to: 294.7,
	},
	{
		icon: 'heap', color: '#FFC400', from: 294.7, to: 612.2,
	},
	{
		icon: 'heap', color: '#FF9100', from: 612.2, to: 1107.14,
	},
	{
		icon: 'heap', color: '#DD2C00', from: 1107.14, to: 2082.9,
	},
	{
		icon: 'heap', color: '#C2185B', from: 2082.9, to: 5347.57,
	},
	{
		icon: 'heap', color: '#880E4F', from: 5347.57, to: '682.5k',
	},
];

const BaseGasesInfoTable: React.FunctionComponent = () => (
	<Stack spacing={1} alignItems="flex-start">
		{levelsList.map((level) => (
			<Stack key={level.color} direction="row" spacing={1.5} justifyContent="flex-start" alignItems="center">
				<Icon iconName="heap" sx={{ height: '24px', width: '24px', color: level.color }} />
				<Typography variant="caption" sx={{ color: '#E9E9ED' }}>
					{`${level.from} - ${level.to}`}
				</Typography>
			</Stack>
		))}
	</Stack>
);

const MobileGasesInfoTable: React.FunctionComponent = () => {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<Box sx={{
			position: 'absolute',
			bottom: 16,
			right: 16,
			zIndex: '1',
		}}
		>
			<Fab onClick={handleOpen} size="medium" color="secondary" aria-label="show heap map">
				<Icon iconName="heap" />
			</Fab>
			<Modal
				open={open}
				onClose={handleClose}
			>
				<Stack sx={{
					p: 4,
					backgroundColor: '#0B071B',
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					borderRadius: 4,
					alignItems: 'center',
					justifyContent: 'center',
				}}
				>
					<BaseGasesInfoTable />
				</Stack>
			</Modal>
		</Box>
	);
};

const GasesInfoTable: React.FunctionComponent = () => (isMobile ? <MobileGasesInfoTable /> : (
	<Box sx={{
		p: 2,
		position: 'absolute',
		bottom: 100,
		right: 38,
		zIndex: '1',
		backgroundColor: '#0B071B',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 4,
	}}
	>
		<BaseGasesInfoTable />
	</Box>
));

export default GasesInfoTable;
