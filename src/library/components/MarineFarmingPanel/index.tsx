import React from 'react';
import { Stack, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { RootState } from 'main/rootReducer';
import { useSelector } from 'react-redux';
import MarineFarmingDataType from 'library/constants/MarineFarmingSlice';
import { DRAWER_WIDTH } from 'library/constants/styled';
import { selectFilterStatuses } from 'library/selectors/filters.selector';
import SlicesBlock from './children/SlicesBlock';
import Icon from '../Icon';
import ShipsFIlter from './children/ShipsFIlter';
import GreenhouseGasesFilter from './children/GreenhouseGasesFilter';
import FilmContaminationFilter from './children/FilmContaminationFilter';
import MonitoringStationsFilter from './children/MonitoringStationsFilter';

interface IProps {}

const MarineFarmingPanel: React.FunctionComponent<IProps> = () => {
	const { pathname } = useLocation();

	const visibleFilters = useSelector((state: RootState) => selectFilterStatuses(state, pathname));

	const checkFilterAvailable = (dataType: MarineFarmingDataType) => visibleFilters.includes(dataType);

	return (
		<Stack direction="column" alignItems="center" sx={{ width: DRAWER_WIDTH, px: 1.5 }}>
			<SlicesBlock />
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
				{checkFilterAvailable(MarineFarmingDataType.SHIPS) && <ShipsFIlter />}
				{checkFilterAvailable(MarineFarmingDataType.GREENHOUSE_GASES) && <GreenhouseGasesFilter />}
				{checkFilterAvailable(MarineFarmingDataType.FILM_CONTAMINATION) && <FilmContaminationFilter />}
				{checkFilterAvailable(MarineFarmingDataType.MONITORING_STATIONS) && <MonitoringStationsFilter />}
			</Stack>

		</Stack>
	);
};

export default MarineFarmingPanel;
