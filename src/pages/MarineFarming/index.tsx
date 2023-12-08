import {Box, Container} from '@mui/material';
import LayoutSelector from 'library/components/LayoutSelector';
import DataMap from 'library/components/map';
import extractLayout from 'library/helpers/extractLayout';
import paths, { LayoutType } from 'library/paths';
import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Charts from './Charts';
import Tables from './Tables';

interface IProps {}

const MarineFarming: React.FunctionComponent<IProps> = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const layout = useMemo(() => extractLayout(pathname), [pathname]);

	const changeLayoutHandle = (value: LayoutType | null) => {
		if (value !== null) {
			navigate(paths.marineFarming[value]);
		}
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
			<Box sx={{
				position: 'absolute', top: 8, right: 8, zIndex: '1',
			}}
			>
				<LayoutSelector value={layout} setValue={changeLayoutHandle} />
			</Box>

			{LayoutType.MAP === layout && process.env.REACT_APP_ACCESS_TOKEN && (
				<DataMap />
			)}
			{LayoutType.CHARTS === layout && <Charts />}
			{LayoutType.TABLE === layout && <Tables />}
		</Container>
	);
};

export default MarineFarming;
