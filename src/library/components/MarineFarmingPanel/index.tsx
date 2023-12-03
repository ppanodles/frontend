import React from 'react';
import { Stack } from '@mui/material';
import paths, { LayoutType } from 'library/paths';
import { useLocation } from 'react-router-dom';
import SlicesBlock from './SlicesBlock';

interface IProps {}

const MarineFarmingPanel: React.FunctionComponent<IProps> = () => {
	const { pathname } = useLocation();

	return (
		<Stack mt={6} direction="column" alignItems="center" sx={{ px: 1.5 }}>
			{ pathname === paths.marineFarming[LayoutType.MAP] && <SlicesBlock /> }
		</Stack>
	);
};

export default MarineFarmingPanel;
