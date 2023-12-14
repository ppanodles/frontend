import React from 'react';
import dayjs from 'dayjs';
import Table, { TableConfig } from 'library/components/Table';
import selectFilteredFilmContaminations from 'library/selectors/filmContamination.selector';
import { IFilmContamination } from 'library/types/marineFarming.d';
import { dateSorting } from 'library/helpers/sorting';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

interface IProps {}

const tableColumns: TableConfig<IFilmContamination>[] = [
	{
		name: 'Время  UTC',
		value: 'time',
		sx: { color: '#C7C5D0' },
		valueGetter: (data: string) => dayjs(data).format('DD-MM-YYYY HH:mm'),
		onSorting: dateSorting,
	},
	{
		name: 'Идентификатор',
		value: 'id',
	},
	{ name: 'Координаты', value: 'coordinates', valueGetter: (data: string) => <Box sx={{ color: '#BDC3D2', textDecoration: 'underline' }}>{data}</Box>},

];

const FilmContaminationTable: React.FunctionComponent<IProps> = () => {
	const filmContaminationData = useSelector(selectFilteredFilmContaminations);

	return (
		<Table<IFilmContamination> tableData={filmContaminationData} tableConfig={tableColumns} defaultSortColumn="time" />
	);
};

export default FilmContaminationTable;
