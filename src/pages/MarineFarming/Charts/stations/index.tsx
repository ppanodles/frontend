import React from 'react';
import {
	Container,
	Grid,
	Paper,
} from '@mui/material';
import { isEmpty } from 'lodash';
import selectFilteredMonitoringStations from 'library/selectors/stations.selector';
import { useSelector } from 'react-redux';

import FilterType from 'library/constants/FilterType';
import { RootState } from 'main/rootReducer';
import Panel from './Panel';
import Station from './Station';

interface IProps {}

const StationsCharts: React.FunctionComponent<IProps> = () => {
	const monitoringStationsData = useSelector((state: RootState) => selectFilteredMonitoringStations(state, FilterType.LIST_SELECTOR));

	if (isEmpty(monitoringStationsData)) {
		return null;
	}

	const selectedStation = monitoringStationsData[0];

	return (
		<Container maxWidth="xl">
			<Paper sx={{ my: 8, p: 3 }}>
				<Panel name={selectedStation.name} />
				<Grid container mt={1} rowSpacing={5} columnSpacing={4}>
					{selectedStation.metals.map((metal) => (
						<Grid item xs={12} md={4} lg={3} xl={2} key={`${metal.name}${metal.label}${metal.leap}`} px={2}>
							<Station metal={metal} />
						</Grid>
					))}
				</Grid>
			</Paper>
		</Container>
	);
};

export default StationsCharts;
