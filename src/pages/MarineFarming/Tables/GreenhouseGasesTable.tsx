import dayjs from 'dayjs';
import Table, { TableConfig } from 'library/components/Table';
import { dateSorting } from 'library/helpers/sorting';
import selectFilteredGases from 'library/selectors/gases.selector';
import { IGreenhouseGases } from 'library/types/marineFarming.d';
import React from 'react';
import { useSelector } from 'react-redux';

interface IProps {}

const tableColumns: TableConfig<IGreenhouseGases>[] = [
	{
		name: 'Время  UTC',
		value: 'time',
		sx: { color: '#C7C5D0' },
		valueGetter: (data: string) => dayjs(data).format('DD/MM/YYYY'),
		onSorting: dateSorting,
	},
	{
		name: 'Уровень', value: 'emissionValue',
	},
	{ name: 'Значение эмиссии', value: 'emissionLevel'},
	{ name: 'Индекс', value: 'device', sx: { color: '#C7C5D0' }},

];

const GreenhouseGasesTable: React.FunctionComponent<IProps> = () => {
	const greenhouseGasesData = useSelector(selectFilteredGases);

	return (
		<Table<IGreenhouseGases> tableData={greenhouseGasesData} tableConfig={tableColumns} defaultSortColumn="emissionLevel" />
	);
};

export default GreenhouseGasesTable;
