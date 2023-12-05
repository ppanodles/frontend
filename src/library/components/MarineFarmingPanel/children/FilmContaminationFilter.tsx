import React from 'react';
import { Stack } from '@mui/material';
import Filter from 'library/components/Filter';
import FilterType from 'library/constants/FilterType';

interface IProps {}

const FilmContaminationFilter: React.FunctionComponent<IProps> = () => (
	<Stack sx={{ width: '100%' }}>
		<Filter
			type={FilterType.LIST_SELECTOR}
			name="Тип пленочного загрязнения"
			values={[]}
			checked={{}}
			onSelect={() => {}}
		/>
	</Stack>
);

export default FilmContaminationFilter;
