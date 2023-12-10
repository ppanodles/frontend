import React, { useMemo } from 'react';

import {Box, Container} from '@mui/material';
import LayoutSelector from 'library/components/LayoutSelector';
import extractLayout from 'library/helpers/extractLayout';
import paths, { LayoutType } from 'library/paths';
import { useLocation, useNavigate } from 'react-router-dom';
import DownloadButton from 'library/components/DownloadButton';
import Charts from 'pages/MarineFarming/Charts';
import EmissionValueChart from 'pages/MarineFarming/Charts/EmissionValueChart';
import AgroTable from './Tables';

interface IProps {}

const AgroIndustry: React.FunctionComponent<IProps> = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const layout = useMemo(() => extractLayout(pathname), [pathname]);

	const changeLayoutHandle = (value: LayoutType.CHARTS | LayoutType.TABLE | null) => {
		if (value !== null) {
			navigate(paths.agroIndustry[value]);
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
				display: 'flex',
			}}
		>
			<Box sx={{
				position: 'absolute', top: 8, right: 64, zIndex: '1',
			}}
			>
				<LayoutSelector value={layout} setValue={changeLayoutHandle} disableMaps />
			</Box>
			<Box sx={{
				position: 'absolute', top: 8, right: 12, zIndex: '1', width: 40, height: 40,
			}}
			>
				<DownloadButton />
			</Box>

			{LayoutType.CHARTS === layout && <Charts />}
			{LayoutType.CHARTS === layout && <EmissionValueChart />}
			{LayoutType.TABLE === layout && <AgroTable />}
		</Container>
	);
};

export default AgroIndustry;
