import React from 'react';
import { useSelector } from 'react-redux';

import dayjs from 'dayjs';

import Table, { TableConfig } from 'library/components/Table';
import { dateSorting } from 'library/helpers/sorting';
import selectFilteredAgroStates from 'library/selectors/agro.selector';
import { IAgroState } from 'library/types/agro.d';

interface IProps {}

const tableColumns: TableConfig<IAgroState>[] = [
	{
		name: 'Время  UTC',
		value: 'time',
		valueGetter: (data: string) => dayjs(data).format('DD/MM/YYYY'),
		onSorting: dateSorting,
	},
	{
		name: 'Температура', value: 'temp', sx: { color: '#FFCC80' },
	},
	{
		name: 'Давление', value: 'pressure', sx: { color: '#8C9EFF' },
	},
	{
		name: 'Влажность', value: 'humidity', sx: { color: '#A5D6A7' },
	},
	{
		name: 'Углерод', value: 'carbon', sx: { color: '#84FFFF' },
	},
	{
		name: 'Станция', value: 'location', sx: { color: '#C7C5D0' },
	},
];

const AgroTable: React.FunctionComponent<IProps> = () => {
	const AgroStatesData = useSelector(selectFilteredAgroStates);

	return (
		<Table<IAgroState> tableData={AgroStatesData} tableConfig={tableColumns} defaultSortColumn="location" />
	);
};

export default AgroTable;
