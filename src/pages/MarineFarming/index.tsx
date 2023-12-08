import {
	Box, Container, Stack, Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import LayoutSelector from 'library/components/LayoutSelector';
import DataMap from 'library/components/map';
import extractLayout from 'library/helpers/extractLayout';
import paths, { LayoutType } from 'library/paths';
import selectFilteredShips from 'library/selectors/ships.selector';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Charts from './Charts';

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

	const test = useSelector(selectFilteredShips);

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
			{paths.marineFarming[LayoutType.CHARTS] === pathname && <Charts />}
			{paths.marineFarming[LayoutType.TABLE] === pathname && (
				<Stack mt={20} mx={2}>
					{
						test.map((a, i) => (
							<Box key={a.id}>
								<Typography variant="h6" sx={{ color: 'white' }}>
									{`${i + 1}) ${a.id} | ${a.vesselName} ${dayjs(a.eta).format('DD/MM/YYYY')}`}
								</Typography>
							</Box>
						))
					}
				</Stack>
			)}
		</Container>
	);
};

export default MarineFarming;
