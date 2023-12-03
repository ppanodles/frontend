import React from 'react';
import FilterType from 'library/constants/FilterType';
import { Box } from '@mui/material';

interface IProps {
    type: FilterType
}

const Filter: React.FunctionComponent<IProps> = ({ type }) => (
	<Box>{type}</Box>
);

export default Filter;
