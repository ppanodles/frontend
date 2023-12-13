import { Grid } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import selectFilteredGases from 'library/selectors/gases.selector';
import { isEmpty } from 'lodash';
import EmissionValueChart from './EmissionValueChart';
import CommonDirty from './CommonDirty';
import Variance from './Variance';
import LevelsChart from './LevelsChart';

interface IProps {}

const GasesCharts: React.FunctionComponent<IProps> = () => {
	const greenhouseGasesData = useSelector(selectFilteredGases);

	if (isEmpty(greenhouseGasesData)) {
		return null;
	}

	return (
		<Grid container direction="row" ml={{xs: 0, md: 4}} mt={8} mr={2} mb={2} overflow="hidden" columnSpacing={3}>
			<Grid item xs={12} lg={7}>
				<Grid container direction="row" height="100%" rowSpacing={3}>
					<Grid item xs={12}>
						<EmissionValueChart greenhouseGasesData={greenhouseGasesData} />
					</Grid>
					<Grid item xs={12}>
						<Grid container direction="row" height="100%" columnSpacing={3}>
							<Grid item xs={12} md={4}>
								<CommonDirty />
							</Grid>
							<Grid item xs={12} md={8}>
								<Variance greenhouseGasesData={greenhouseGasesData} />
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>

			<Grid item xs={12} mb={3} md={5}>
				<LevelsChart greenhouseGasesData={greenhouseGasesData} />
			</Grid>
		</Grid>
	);
};

export default GasesCharts;
