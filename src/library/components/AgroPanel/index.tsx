import React from 'react';
import { Stack, Typography } from '@mui/material';
import { DRAWER_WIDTH } from 'library/constants/styled';
import Icon from '../Icon';
import AgroFilter from './child/agroFilter';

interface IProps {}

const AgroPanel: React.FunctionComponent<IProps> = () => (
	<Stack direction="column" alignItems="center" sx={{ width: DRAWER_WIDTH, px: 1.5 }}>
		<Stack
			direction="row"
			spacing={0.7}
			sx={{
				width: '100%',
				mt: 8,
				mb: 3,
				display: 'flex',
				color: ({ palette }) => palette.common.white,
			}}
		>
			<Icon iconName="filters" />
			<Typography>Фильтр данных</Typography>
		</Stack>

		<Stack spacing={3} width="100%">
			<AgroFilter />
		</Stack>

	</Stack>
);

export default AgroPanel;
