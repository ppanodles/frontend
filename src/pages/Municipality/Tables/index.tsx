import React from 'react';
import { useSelector } from 'react-redux';

import dayjs from 'dayjs';

import Table, { TableConfig } from 'library/components/Table';
import { dateSorting } from 'library/helpers/sorting';
import { IMunicipalityState } from 'library/types/municipality';
import selectFilteredMunicipalityStates from 'library/selectors/municipality.selector';

interface IProps {}

const tableColumns: TableConfig<IMunicipalityState>[] = [
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

const MunicipalityTable: React.FunctionComponent<IProps> = () => {
	const MunicipalityStatesData = useSelector(selectFilteredMunicipalityStates);

	return (
		<Table<IMunicipalityState> tableData={MunicipalityStatesData} tableConfig={tableColumns} defaultSortColumn="location" />
	);
};

export default MunicipalityTable;
