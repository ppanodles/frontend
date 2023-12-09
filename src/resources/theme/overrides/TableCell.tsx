import { Theme } from '@mui/material';

const TableCell = (theme: Theme) => ({
	MuiTableCell: {
		styleOverrides: {
			root: {
				color: '#FFFBFF',
				borderColor: 'rgba(0, 0, 0, 0.12)',

				'.Mui-active': {
					color: `${theme.palette.success.main}!important`,
				},
			},
		},
	},
});

export default TableCell;
