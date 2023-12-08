import { TableCellProps, TableCell as MuiTableCell } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

interface IProps extends TableCellProps {
    type?: 'date';
    data: string;
}

const TableCell: React.FunctionComponent<IProps> = ({ type, data, ...props }) => {
	switch (type) {
	case 'date': {
		return <MuiTableCell {...props}>{dayjs(data).format('DD/MM/YYYY')}</MuiTableCell>;
	}

	default:
		return <MuiTableCell {...props}>{data}</MuiTableCell>;
	}
};

export default TableCell;
