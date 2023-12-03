import { Box, Container } from '@mui/material';
import LayoutSelector from 'library/components/LayoutSelector';
import DataMap from 'library/components/map';
import extractLayout from 'library/helpers/extractLayout';
import paths, { LayoutType } from 'library/paths';
import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface IProps {}

const MarineFarming: React.FunctionComponent<IProps> = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const changeLayoutHandle = (value: LayoutType | null) => {
		if (value !== null) {
			navigate(paths.marineFarming[value]);
		}
	};

	const layout = useMemo(() => extractLayout(pathname), [pathname]);

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
			<Box sx={{
				position: 'absolute', top: 8, right: 8, zIndex: '1',
			}}
			>
				<LayoutSelector value={layout} setValue={changeLayoutHandle} />
			</Box>

			{paths.marineFarming[LayoutType.MAP] === pathname && process.env.REACT_APP_ACCESS_TOKEN && (
				<DataMap />
			)}
			{paths.marineFarming[LayoutType.CHARTS] === pathname && <div>charts</div>}
			{paths.marineFarming[LayoutType.TABLE] === pathname && <div>table</div>}
		</Container>
	);
};

export default MarineFarming;
