import { Stack } from '@mui/material';
import Filter from 'library/components/Filter';
import FilterType from 'library/constants/FilterType';
import React from 'react';

interface IProps {}

const GreenhouseGasesFilter: React.FunctionComponent<IProps> = () => (
	<Stack sx={{ width: '100%' }}>
		<Filter type={FilterType.RANGE} name="Уровень эмиссии" data={{ from: 0, to: 3 }} />
	</Stack>
);

export default GreenhouseGasesFilter;
