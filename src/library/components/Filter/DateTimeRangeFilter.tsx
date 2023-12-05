import { Box, Typography } from '@mui/material';
import React from 'react';
import { filterLabelSx } from './commonData';

export type IDateTimeRangeFilter = {
    name: string;
    data: {
        from: Date;
        to: Date;
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const RangeFilter: React.FunctionComponent<IDateTimeRangeFilter> = ({ name, data }) => (
	<Box>
		<Typography sx={filterLabelSx}>
			{name}
		</Typography>
	</Box>
);

export default RangeFilter;
