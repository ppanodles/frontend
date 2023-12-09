import { Theme } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const TableHead = (theme: Theme) => ({
	MuiTableHead: {
		styleOverrides: {
			root: {
				'.MuiTableRow-root': {
					background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), var(--a-background-table-row, #313140)',

					'.MuiTableCell-root': {
						color: '#90909A',
					},
				},
			},
		},
	},
});

export default TableHead;
