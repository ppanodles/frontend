import {
	Box, ListItemButton, List, ListItem, ListItemAvatar, ListItemText, Typography, Stack, ListItemIcon,
} from '@mui/material';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'main/rootReducer';
import { toggleSliceAccessibility } from 'library/slices/marineFarming.slice';
import { IconNames } from 'resources/icons';

import MarineFarmingDataType from 'library/constants/MarineFarmingSlice';
import { selectAccessibleSlices } from 'library/selectors/filters.selector';
import { useLocation } from 'react-router-dom';
import getLayoutTypeFomPath from 'library/helpers/getLayoutTypeFomPath';
import Icon from '../../Icon';

interface IProps {}

type SliceSelectorType = { id: MarineFarmingDataType, name: string, icon: IconNames, status: boolean };

const SlicesBlock: React.FunctionComponent<IProps> = () => {
	const dispatch = useDispatch();

	const { pathname } = useLocation();

	const sliceFlags = useSelector((state: RootState) => state.marineFarming.slicesStatus);

	const accessibleSlices = useSelector((state: RootState) => selectAccessibleSlices(state, pathname));

	const slices: SliceSelectorType[] = useMemo(() => accessibleSlices.reduce((accumulator: SliceSelectorType[], currentValue: MarineFarmingDataType) => {
		if (currentValue === MarineFarmingDataType.SHIPS) {
			const slice: SliceSelectorType = {
				id: MarineFarmingDataType.SHIPS,
				name: 'Судно/Корабль',
				icon: 'near-me',
				status: sliceFlags[MarineFarmingDataType.SHIPS],
			};

			return [...accumulator, slice];
		}

		if (currentValue === MarineFarmingDataType.GREENHOUSE_GASES) {
			const slice: SliceSelectorType = {
				id: MarineFarmingDataType.GREENHOUSE_GASES,
				name: 'Парниковые газы от судоходства',
				icon: 'heat',
				status: sliceFlags[MarineFarmingDataType.GREENHOUSE_GASES],
			};

			return [...accumulator, slice];
		}

		if (currentValue === MarineFarmingDataType.FILM_CONTAMINATION) {
			const slice: SliceSelectorType = {
				id: MarineFarmingDataType.FILM_CONTAMINATION,
				name: 'Пленочные загрязнения',
				icon: 'water-ec',
				status: sliceFlags[MarineFarmingDataType.FILM_CONTAMINATION],
			};

			return [...accumulator, slice];
		}

		if (currentValue === MarineFarmingDataType.MONITORING_STATIONS) {
			const slice: SliceSelectorType = {
				id: MarineFarmingDataType.MONITORING_STATIONS,
				name: 'Станции мониторинга',
				icon: 'near-me',
				status: sliceFlags[MarineFarmingDataType.MONITORING_STATIONS],
			};

			return [...accumulator, slice];
		}

		return accumulator;
	}, [] as SliceSelectorType[]), [sliceFlags, accessibleSlices]);

	const listItemButtonHandler = (id: MarineFarmingDataType) => dispatch(toggleSliceAccessibility({dataType: id, currentLayout: getLayoutTypeFomPath(pathname)}));

	return (
		<Box>
			<Stack direction="row" spacing={0.7} sx={{ mb: 3, display: 'flex', color: ({ palette }) => palette.common.white }}>
				<Icon iconName="items" />
				<Typography>Слои</Typography>
			</Stack>
			<List dense>
				{
					slices.map((data) => (
						<ListItem
							key={data.name}
							disablePadding
							sx={{
								'&:not(first-child)': {
									mt: 1,
								},
							}}
						>
							<ListItemButton
								role={undefined}
								onClick={() => listItemButtonHandler(data.id)}
								dense
								sx={{ backgroundColor: ({ palette }) => palette.primary.light}}
							>
								<ListItemAvatar sx={{ display: 'flex', alignItems: 'center'}}>
									<Box sx={{ height: '40px', width: '2px', backgroundColor: ({ palette }) => (data.status ? palette.success.light : palette.info.main) }} />
									<Icon sx={{ ml: 2, color: ({ palette }) => palette.info.main }} iconName={data.icon} />
								</ListItemAvatar>
								<ListItemText
									sx={{
										color: ({ palette }) => palette.info.main,
									}}
									primary={data.name}
								/>
								<ListItemIcon sx={{ width: '24px', minWidth: '24px' }}>
									<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
										<Icon sx={{ color: ({ palette }) => palette.info.main }} iconName={data.status ? 'visibility-on' : 'visibility-off'} />
									</Box>
								</ListItemIcon>
							</ListItemButton>
						</ListItem>
					))
				}
			</List>
		</Box>
	);
};

export default SlicesBlock;
