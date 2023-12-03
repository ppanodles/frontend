import {
	Box, ListItemButton, List, ListItem, ListItemAvatar, ListItemText, Typography, Stack, ListItemIcon,
} from '@mui/material';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'main/rootReducer';
import { toggleSliceAccessibility } from 'library/slices/marineFarming.slice';
import { IconNames } from 'resources/icons';

import MarineFarmingDataType from 'library/constants/MarineFarmingSlice';
import Icon from '../../Icon';

interface IProps {}

type SliceSelectorType = { id: MarineFarmingDataType, name: string, icon: IconNames, status: boolean };

const SlicesBlock: React.FunctionComponent<IProps> = () => {
	const dispatch = useDispatch();

	const sliceFlags = useSelector((state: RootState) => state.marineFarming.slicesAccessibility);

	const slices: SliceSelectorType[] = useMemo(() => ([
		{
			id: MarineFarmingDataType.SHIPS, name: 'Судно/Корабль', icon: 'near-me', status: sliceFlags[MarineFarmingDataType.SHIPS],
		},
		{
			id: MarineFarmingDataType.GREENHOUSE_GASES, name: 'Парниковые газы от судоходства', icon: 'heat', status: sliceFlags[MarineFarmingDataType.GREENHOUSE_GASES],
		},
		{
			id: MarineFarmingDataType.FILM_CONTAMINATION, name: 'Пленочные загрязнения', icon: 'water-ec', status: sliceFlags[MarineFarmingDataType.FILM_CONTAMINATION],
		},
	]), [sliceFlags]);

	const listItemButtonHandler = (id: MarineFarmingDataType) => dispatch(toggleSliceAccessibility(id));
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
