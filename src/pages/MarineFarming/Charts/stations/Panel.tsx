import React from 'react';
import { Stack, Typography } from '@mui/material';

interface IProps {
    name: string;
}

const Panel: React.FunctionComponent<IProps> = ({ name }) => (
	<Stack direction="row" alignItems="center" justifyContent="space-between">
		<Stack sx={{
			idth: '268px',
			height: '59px',
		}}
		>
			<Typography variant="h6" sx={{ color: (theme) => theme.palette.common.white }}>{name}</Typography>
			<Typography variant="body1" sx={{ color: (theme) => theme.palette.common.white }}>Содержание металлов, мкг/дм3</Typography>
		</Stack>

		<Stack direction="row" spacing={2}>
			<Stack direction="row" alignItems="center" spacing={1}>
				<div
					style={{
						width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#22C38E',
					}}
				/>
				<Typography variant="caption" sx={{ color: (theme) => theme.palette.common.white }}>Дно</Typography>
			</Stack>
			<Stack direction="row" alignItems="center" spacing={1}>
				<div
					style={{
						width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#304FFE',
					}}
				/>
				<Typography variant="caption" sx={{ color: (theme) => theme.palette.common.white }}>Поверхность</Typography>
			</Stack>
			<Stack direction="row" alignItems="center" spacing={1}>
				<div
					style={{
						width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FF9315',
					}}
				/>
				<Typography variant="caption" sx={{ color: (theme) => theme.palette.common.white }}>Скачек</Typography>
			</Stack>
		</Stack>
	</Stack>
);

export default Panel;
