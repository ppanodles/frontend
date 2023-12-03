import { Box, Container } from '@mui/material';
import LayoutSelector from 'library/components/LayoutSelector';
import extractLayout from 'library/helpers/extractLayout';
import paths, { LayoutType } from 'library/paths';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface IProps {}

const MarineFarming: React.FunctionComponent<IProps> = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const changeLayoutHandle = (value: LayoutType | null) => {
		if (value !== null) { navigate(paths.marineFarming[value]); }
	};

	return (
		<Container
			disableGutters
			maxWidth={false}
			sx={{
				width: '100%',
				height: '100%',
				position: 'relative',
			}}
		>
			<Box sx={{ position: 'absolute', top: 8, right: 8 }}>
				<LayoutSelector value={extractLayout(pathname)} setValue={changeLayoutHandle} />
			</Box>

			{paths.marineFarming[LayoutType.MAP] === pathname && <div>map</div>}
			{paths.marineFarming[LayoutType.CHARTS] === pathname && <div>charts</div>}
			{paths.marineFarming[LayoutType.TABLE] === pathname && <div>table</div>}
		</Container>
	);
};

export default MarineFarming;
