import { Box, Typography } from '@mui/material';
import React from 'react';
import { filterLabelSx } from './commonData';

export type IRangeFilter = {
    name: string;
    data: {
        from: number;
        to: number;
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const RangeFilter: React.FunctionComponent<IRangeFilter> = ({ name, data }) => (
	<Box>
		<Typography sx={filterLabelSx}>
			{name}
		</Typography>
	</Box>
);

export default RangeFilter;
