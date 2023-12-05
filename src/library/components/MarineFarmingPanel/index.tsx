import React, { useCallback } from 'react';
import { Stack, Typography } from '@mui/material';
import paths, { LayoutType } from 'library/paths';
import { useLocation } from 'react-router-dom';
import { RootState } from 'main/rootReducer';
import { useSelector } from 'react-redux';
import { Filters, ISlicesAccessibility } from 'library/slices/marineFarming.slice';
import MarineFarmingDataType from 'library/constants/MarineFarmingSlice';
import SlicesBlock from './children/SlicesBlock';
import Icon from '../Icon';
import ShipsFIlter from './children/ShipsFIlter';
import GreenhouseGasesFilter from './children/GreenhouseGasesFilter';
import FilmContaminationFilter from './children/FilmContaminationFilter';

interface IProps {}

const shouldShowFilter = (pathname: string, slicesAccessibility: ISlicesAccessibility, selectedTable: MarineFarmingDataType) => (filter: keyof Filters): boolean => {
	if (pathname === paths.marineFarming[LayoutType.MAP]) {
		return slicesAccessibility[filter];
	}

	if (pathname === paths.marineFarming[LayoutType.TABLE]) {
		return filter === selectedTable;
	}

	return true;
};

const MarineFarmingPanel: React.FunctionComponent<IProps> = () => {
	const { pathname } = useLocation();

	const { slicesAccessibility, selectedTable } = useSelector((state: RootState) => state.marineFarming);

	const checkFilterAvailable = useCallback(shouldShowFilter(pathname, slicesAccessibility, selectedTable), [pathname, selectedTable, slicesAccessibility]);

	const isSliceFiltersVisible = pathname === paths.marineFarming[LayoutType.MAP];

	return (
		<Stack direction="column" alignItems="center" sx={{ px: 1.5 }}>
			{ isSliceFiltersVisible && <SlicesBlock /> }
			<Stack
				direction="row"
				spacing={0.7}
				sx={{
					width: '100%',
					mt: isSliceFiltersVisible ? 8 : 0,
					mb: 3,
					display: 'flex',
					color: ({ palette }) => palette.common.white,
				}}
			>
				<Icon iconName="filters" />
				<Typography>Фильтр данных</Typography>
			</Stack>

			<Stack spacing={3}>
				{checkFilterAvailable(MarineFarmingDataType.SHIPS) && <ShipsFIlter />}
				{checkFilterAvailable(MarineFarmingDataType.FILM_CONTAMINATION) && <FilmContaminationFilter />}
				{checkFilterAvailable(MarineFarmingDataType.GREENHOUSE_GASES) && <GreenhouseGasesFilter />}
			</Stack>

		</Stack>
	);
};

export default MarineFarmingPanel;
