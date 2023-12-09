import { merge } from 'lodash';
import { Theme } from '@mui/material';
import TableHead from './TableHead';
import TableCell from './TableCell';

const componentsOverride = (theme: Theme) => merge(
	TableHead(theme),
	TableCell(theme),
);

export default componentsOverride;
