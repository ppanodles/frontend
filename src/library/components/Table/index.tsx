import React, { useState } from 'react';
import {
	Box,
	Paper,
	Table as MuiTable,
	TableBody,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	TableCell,
	TableSortLabel,
	Typography,
	useTheme,
	SxProps,
	Theme,
	Stack,
} from '@mui/material';
import { isEmpty } from 'lodash';

import { Order, stableSort, getComparator } from 'library/helpers/sorting';
import pagesDictionary from 'library/helpers/pagesDictionary';

export type TableConfig<T extends object> = {
	name: string;
	value: keyof T & string;
	sx?: SxProps<Theme>;
	valueGetter?: (value: string) => React.ReactElement | string;
	onSorting?: (a: T, b: T, orderByField: any) => 1 | -1 | 0;
}

type IProps<T extends object> = {
    tableData: T[];
    tableConfig: TableConfig<T>[];
    defaultSortColumn: keyof T;
}

const Table = <T extends object>({ tableData, tableConfig, defaultSortColumn }: IProps<T>) => {
	const [order, setOrder] = useState<Order>('asc');
	const [orderBy, setOrderBy] = useState<{field: keyof T, customFunction?:(a: T, b: T, orderByField: keyof T) => 1 | -1 | 0}>({ field: defaultSortColumn });
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleChangePage = (_: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const theme = useTheme();

	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData.length) : 0;

	const handleRequestSort = (property: {field: keyof T, customFunction?:(a: T, b: T, orderByField: keyof T) => 1 | -1 | 0}) => {
		const isAsc = orderBy.field === property.field && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc'); // union
		setOrderBy(property); // union
	};

	const visibleRows = React.useMemo(
		() => {
			const sortedArray = stableSort(tableData, getComparator(order, orderBy));

			return rowsPerPage > 0
				? sortedArray.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
				: sortedArray;
		},
		[order, orderBy, page, rowsPerPage, tableData],
	);

	if (isEmpty(tableData)) {
		return (
			<Stack
				spacing={2}
				sx={{
					position: 'absolute',
					inset: '60px 12px 64px 88px',
					display: 'flex',
					alignItems: 'flex-start',
				}}
			>
				<Typography variant="h3" sx={{ color: theme.palette.grey[300] }}>Для таких настроек данные не найдены</Typography>
				<Typography variant="h5" sx={{ color: theme.palette.grey[700] }}>Выберете нужный слой и найстройте фильтр данных.</Typography>
			</Stack>
		);
	}

	return (
		<Box sx={{
			position: 'absolute',
			inset: {
				xs: '60px 8px 32px 8px',
				md: '60px 12px 32px 43px',
			},
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
					<MuiTable sx={{ minWidth: 650, color: 'white' }} size="small" aria-label="a dense table">
						<TableHead>
							<TableRow sx={{ height: '52px' }}>
								<TableCell sx={{ color: 'white' }}>№</TableCell>
								{tableConfig.map((column) => (
									<TableCell
										key={`column_${column.value}_${column.name}`}
										sortDirection={orderBy.field === column.value ? order : false}
									>
										<TableSortLabel
											active={orderBy.field === column.value}
											direction={orderBy.field === column.value ? order : 'asc'}
											onClick={() => handleRequestSort({field: column.value, customFunction: column.onSorting})}
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
								.map((row, index) => (
									<TableRow
										hover
										key={row.id}
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
											tableConfig.map((cell) => (
												<TableCell
													key={`${row.id}_${cell.value}_${cell.name}`}
													align="left"
													sx={cell.sx}
												>
													{cell?.valueGetter ? cell.valueGetter(row[cell.value]) : row[cell.value]}
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
					</MuiTable>
				</TableContainer>
				<TablePagination
					size="small"
					component={Box}
					page={page}
					count={tableData.length}
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

export default Table;
