import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useMount } from 'react-use';
import {
	Box,
	Paper,
	Table,
	TableBody,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	TableCell,
	TableSortLabel,
	Typography,
	useTheme,
	Theme,
	SxProps,
} from '@mui/material';
import { isEmpty } from 'lodash';
import getLayoutTypeFomPath from 'library/helpers/getLayoutTypeFomPath';
import selectFilteredShips from 'library/selectors/ships.selector';
import { selectFirstEnableSlice } from 'library/slices/marineFarming.slice';
import { IShip } from 'library/types/marineFarming.d';
import dayjs from 'dayjs';

type Order = 'asc' | 'desc';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(
	order: Order,
	orderBy: { field: any, customFunction?:(a: any, b: any, orderByField: any) => 1 | -1 | 0 },
): (
	a: { [key: string]: number | string },
	b: { [key: string]: number | string }
  ) => number {
	if (orderBy?.customFunction !== undefined) {
		const { customFunction } = orderBy;

		return order === 'desc'
			? (a, b) => customFunction(a, b, orderBy.field)
			: (a, b) => -customFunction(a, b, orderBy.field);
	}

	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy.field)
		: (a, b) => -descendingComparator(a, b, orderBy.field);
}

function stableSort(
	array: any[],
	comparator: (a: any, b: any) => number,
) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

/*
	TODo
	Реализовать сортировку
*/

interface IProps {}

type TableDataType<T> = {
	name: string;
	value: keyof T;
	sx?: SxProps<Theme>;
	valueGetter?: (value: any) => React.ReactElement | string;
	onSorting?: (a: T, b: T, orderByField: any) => 1 | -1 | 0;
}

const tableColumns: TableDataType<IShip>[] = [
	{
		name: 'IMO', value: 'imo', sx: { color: '#C7C5D0' },
	},
	{
		name: 'MMSI', value: 'mmsi', sx: { color: '#C7C5D0' },
	},
	{ name: 'Название судна', value: 'vesselName'},
	{ name: 'Порт назначения', value: 'destinationPort'},
	{
		name: 'Прибытие  UTC',
		value: 'eta',
		valueGetter: (data: any) => dayjs(data).format('DD/MM/YYYY'),
		onSorting: (ship1: IShip, ship2: IShip, orderByField: 'eta') => {
			const date1 = dayjs(ship1[orderByField]);
			const date2 = dayjs(ship2[orderByField]);

			if (date2.isBefore(date1)) {
				return -1;
			}
			if (date1.isBefore(date2)) {
				return 1;
			}
			return 0;
		},
	},
];

const pagesDictionary = (type: 'first' | 'last' | 'next' | 'previous') => {
	switch (type) {
	case 'first':
		return 'первая';
	case 'last':
		return 'последняя';
	case 'next':
		return 'следующая';
	case 'previous':
		return 'предыдущая';
	default:
		return '';
	}
};

const Tables: React.FunctionComponent<IProps> = () => {
	const dispatch = useDispatch();

	const { pathname } = useLocation();

	useMount(() => {
		dispatch(selectFirstEnableSlice(getLayoutTypeFomPath(pathname)));
	});

	const [order, setOrder] = useState<Order>('asc');
	const [orderBy, setOrderBy] = useState<{field: keyof IShip, customFunction?:(a: IShip, b: IShip, orderByField: keyof IShip) => 1 | -1 | 0}>({field: 'vesselName'});
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleChangePage = (_: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const shipsData = useSelector(selectFilteredShips);

	const theme = useTheme();

	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - shipsData.length) : 0;

	const handleRequestSort = (property: {field: keyof IShip, customFunction?:(a: IShip, b: IShip, orderByField: keyof IShip) => 1 | -1 | 0}) => {
		const isAsc = orderBy.field === property.field && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc'); // union
		setOrderBy(property); // union
	};

	const visibleRows = React.useMemo(
		() => (rowsPerPage > 0
			? stableSort(shipsData, getComparator(order, orderBy)).slice(
				page * rowsPerPage,
				page * rowsPerPage + rowsPerPage,
			)
			: []),
		[order, orderBy, page, rowsPerPage, shipsData],
	);

	if (isEmpty(shipsData)) {
		return (
			<Typography variant="h2" sx={{ color: theme.palette.grey[300] }}>NO DATA</Typography>
		);
	}

	return (
		<Box sx={{
			position: 'absolute',
			inset: '60px 12px 32px 43px',
			display: 'flex',
			alignItems: 'flex-start',
		}}
		>
			<Paper
				sx={{
					minWidth: '100%',
					maxWidth: '100%',
					maxHeight: '100%',
					boxShadow: '2px 8px 30px 16px rgba(28, 51, 49, 0.10)',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<TableContainer sx={{
					'&::-webkit-scrollbar': {
						width: '0.3rem',
						height: '0.3rem',
					},

					'&::-webkit-scrollbar-thumb': {
						borderRadius: '8px',
						backgroundColor: '#46464F',
					},
					'&::-webkit-scrollbar-corner': {
						backgroundColor: theme.palette.background.paper,
					},
				}}
				>
					<Table sx={{ minWidth: 650, color: 'white' }} size="small" aria-label="a dense table">
						<TableHead>
							<TableRow sx={{ height: '52px' }}>
								<TableCell sx={{ color: 'white' }}>№</TableCell>
								{tableColumns.map((column) => (
									<TableCell
										key={`column_${column.value}`}
										sortDirection={orderBy.field === column.value ? order : false}
									>
										<TableSortLabel
											active={orderBy.field === column.value}
											direction={orderBy.field === column.value ? order : 'asc'}
											onClick={() => handleRequestSort({field: column.value, customFunction: column.onSorting})}
											sx={{
												// '.MuiTableSortLabel-root': {
												'.Mui-active': {
													color: 'red',
												},
												// },
											}}
										>
											{column.name}
											{orderBy.field === column.value ? (
												<Box
													component="span"
													sx={{
														border: 0,
														clip: 'rect(0 0 0 0)',
														height: '1px',
														margin: -1,
														overflow: 'hidden',
														padding: 0,
														position: 'absolute',
														whiteSpace: 'nowrap',
														width: '1px',
													}}
												>
													{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
												</Box>
											) : null}
										</TableSortLabel>
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{visibleRows
								.map((ship, index) => (
									<TableRow
										hover
										key={ship.id}
										sx={{
											height: 32,
											cursor: 'pointer',

											'& .MuiTableCell-root': {
												height: '32px',
												whiteSpace: 'nowrap',
											},

											'&:last-child td, &:last-child th': { border: 0 },
										}}
									>
										<TableCell align="left" sx={{ color: '#C7C5D0' }}>
											{index.toString()}
										</TableCell>
										{
											tableColumns.map((cell) => (
												<TableCell
													key={`${ship.id}_${cell.value}`}
													align="left"
													sx={cell.sx}
												>
													{cell?.valueGetter ? cell.valueGetter(ship[cell.value]) : ship[cell.value]}
												</TableCell>
											))
										}
									</TableRow>
								))}
							{emptyRows > 0 && (
								<TableRow
									sx={{
										height: 32.6 * emptyRows,
									}}
								>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					size="small"
					component={Box}
					page={page}
					count={shipsData.length}
					rowsPerPageOptions={[10, 50, { value: -1, label: 'Все' }]}
					rowsPerPage={rowsPerPage}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
					labelDisplayedRows={({ from, to, count }) => `${from}-${to} из ${count}`}
					labelRowsPerPage="Строк на странице:"
					getItemAriaLabel={(type) => `Перейти на ${pagesDictionary(type)} страницу`}
					sx={{
						height: '46px',
						minHeight: '46px',
						userSelect: 'none',
						color: '#C7C5D0',
						borderWidth: '1px',
						borderStyle: 'solid',
						borderColor: 'rgba(0, 0, 0, 0.12)',

						'.MuiTablePagination-toolbar': {
							height: '44px',
							minHeight: '44px',
						},

						'.MuiSelect-icon': {
							color: '#C7C5D0',
						},
					}}
					slotProps={{
						select: {
							inputProps: {
								'aria-label': 'rows per page',
							},
							MenuProps: {
								sx: {
									'.MuiList-root': {
										color: '#C7C5D0',
									},
								},
							},
						},
					}}
				/>
			</Paper>
		</Box>
	);
};

export default Tables;
