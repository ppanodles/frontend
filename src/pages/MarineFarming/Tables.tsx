import {
	Paper, Stack, Table, TableBody, TableContainer, TableHead, TableRow, Typography,
} from '@mui/material';
import TableCell from 'library/components/TableCell';
import getLayoutTypeFomPath from 'library/helpers/getLayoutTypeFomPath';
import selectFilteredShips from 'library/selectors/ships.selector';
import { selectFirstEnableSlice } from 'library/slices/marineFarming.slice';
import { IShip } from 'library/types/marineFarming.d';
import { isEmpty } from 'lodash';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useMount } from 'react-use';

interface IProps {}

const tableColumns: {name: string, value: (keyof IShip), type?: 'date'}[] = [
	{ name: 'IMO', value: 'imo'},
	{ name: 'MMSI', value: 'mmsi'},
	{ name: 'Название судна', value: 'vesselName'},
	{ name: 'Порт назначения', value: 'destinationPort'},
	{ name: 'Прибытие  UTC', value: 'eta', type: 'date'},
];

const Tables: React.FunctionComponent<IProps> = () => {
	const dispatch = useDispatch();

	const { pathname } = useLocation();

	useMount(() => {
		dispatch(selectFirstEnableSlice(getLayoutTypeFomPath(pathname)));
	});

	const shipsData = useSelector(selectFilteredShips);

	return (
		<Stack mt={15} mx={2}>
			<Typography variant="h2" sx={{ color: (theme) => theme.palette.common.white }}>TABLES</Typography>

			{!isEmpty(shipsData) ? (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
						<TableHead>
							<TableRow>
								<TableCell data="№" />
								{tableColumns.map((column) => (<TableCell key={`column_${column.value}`} data={column.name} />))}
							</TableRow>
						</TableHead>
						<TableBody>
							{shipsData.map((ship, index) => (
								<TableRow
									key={ship.id}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell align="left" data={index.toString()} />
									{
										tableColumns.map((cell) => (
											<TableCell
												key={`${ship.id}_${cell.value}`}
												align="left"
												data={`${ship[cell.value]}`}
												type={cell.type}
											/>
										))
									}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			) : <Typography variant="h2" sx={{ color: (theme) => theme.palette.grey[300] }}>NO DATA</Typography>}
		</Stack>
	);
};

export default Tables;
