import {Box, Container} from '@mui/material';
import LayoutSelector from 'library/components/LayoutSelector';
import DataMap from 'library/components/map';
import extractLayout from 'library/helpers/extractLayout';
import paths, { LayoutType } from 'library/paths';
import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DownloadButton from 'library/components/DownloadButton';
import Tables from './Tables';
import Charts from './Charts';

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
				display: 'flex',
			}}
		>
			<Box sx={{
				position: 'absolute', top: 8, right: 64, zIndex: '1',
			}}
			>
				<LayoutSelector value={layout} setValue={changeLayoutHandle} />
			</Box>
			{ LayoutType.MAP !== layout && (
				<Box sx={{
					position: 'absolute', top: 8, right: 12, zIndex: '1', width: 40, height: 40,
				}}
				>
					<DownloadButton />
				</Box>
			)}

			{LayoutType.MAP === layout && process.env.REACT_APP_ACCESS_TOKEN && (
				<DataMap />
			)}
			{LayoutType.CHARTS === layout && <Charts />}
			{LayoutType.TABLE === layout && <Tables />}
		</Container>
	);
};

export default MarineFarming;
