import React from 'react';
import {
	Box, Button, Slide, Stack, Typography,
} from '@mui/material';
import { DRAWER_WIDTH } from 'library/constants/styled';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'main/rootReducer';
import { dropFilters } from 'library/slices/agro.slice';
import Icon from '../Icon';
import AgroFilter from './child/agroFilter';

interface IProps {}

const AgroPanel: React.FunctionComponent<IProps> = () => {
	const dispatch = useDispatch();
	const isAnyFilterSelected = useSelector((state: RootState) => state.agro.isAnyFilterSelected);

	return (
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
			<Slide direction="up" in={isAnyFilterSelected} mountOnEnter unmountOnExit>
				<Box sx={{
					position: 'sticky', zIndex: 1, bottom: -8, left: 0, right: 0,
				}}
				>
					<Button
						sx={{
							backgroundColor: '#232330',

							'&:hover': {
								backgroundColor: '#46464F',
							},
						}}
						variant="contained"
						fullWidth
						onClick={() => dispatch(dropFilters())}
					>
						Сбросить фильтры
					</Button>
				</Box>
			</Slide>
		</Stack>
	);
};

export default AgroPanel;
