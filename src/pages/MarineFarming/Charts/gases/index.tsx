import { Container, Grid, Stack } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import selectFilteredGases from 'library/selectors/gases.selector';
import { isEmpty } from 'lodash';
import EmissionValueChart from './EmissionValueChart';
import Variance from './Variance';
import LevelsChart from './LevelsChart';

interface IProps {}

const GasesCharts: React.FunctionComponent<IProps> = () => {
	const greenhouseGasesData = useSelector(selectFilteredGases);

	if (isEmpty(greenhouseGasesData)) {
		return null;
	}

	return (
		<Container sx={{ mt: 8 }} maxWidth={false}>
			<Grid container direction="row" overflow="auto" columnSpacing={3} rowSpacing={3}>
				<Grid item xs={12} lg={7}>
					<Stack spacing={2} sx={{ height: '100%' }}>
						<EmissionValueChart greenhouseGasesData={greenhouseGasesData} />
						<Variance greenhouseGasesData={greenhouseGasesData} />
					</Stack>
					{/* <Grid container direction="row" height="100%" rowSpacing={3}>
						<Grid item xs={12}>
							<EmissionValueChart greenhouseGasesData={greenhouseGasesData} />
						</Grid>
						<Grid item xs={12}>
							<Variance greenhouseGasesData={greenhouseGasesData} />
						</Grid>
					</Grid> */}
				</Grid>

				<Grid item xs={12} md={5}>
					<LevelsChart greenhouseGasesData={greenhouseGasesData} />
				</Grid>
			</Grid>
		</Container>
	);
};

export default GasesCharts;
