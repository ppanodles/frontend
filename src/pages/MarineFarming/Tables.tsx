import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useMount } from 'react-use';

import getLayoutTypeFomPath from 'library/helpers/getLayoutTypeFomPath';
import selectFilteredShips from 'library/selectors/ships.selector';
import { selectFirstEnableSlice } from 'library/slices/marineFarming.slice';
import { IShip } from 'library/types/marineFarming.d';
import dayjs from 'dayjs';

import Table, { TableConfig } from 'library/components/Table';
import { dateSorting } from 'library/helpers/sorting';

interface IProps {}

const tableColumns: TableConfig<IShip>[] = [
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
		valueGetter: (data: string) => dayjs(data).format('DD/MM/YYYY'),
		onSorting: dateSorting,
	},
];

const Tables: React.FunctionComponent<IProps> = () => {
	const dispatch = useDispatch();

	const { pathname } = useLocation();

	useMount(() => {
		dispatch(selectFirstEnableSlice(getLayoutTypeFomPath(pathname)));
	});

	const shipsData = useSelector(selectFilteredShips);

	return (
		<Table<IShip> tableData={shipsData} tableConfig={tableColumns} defaultSortColumn="vesselName" />
	);
};

export default Tables;
