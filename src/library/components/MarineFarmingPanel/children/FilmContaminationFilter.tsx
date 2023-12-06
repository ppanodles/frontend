import React from 'react';
import { Stack } from '@mui/material';
import Filter from 'library/components/Filter';
import FilterType from 'library/constants/FilterType';
import MarineFarmingDataType from 'library/constants/MarineFarmingSlice';
import selectFilters from 'library/selectors/filters.selector';
import { CommonFilterDataType } from 'library/types/system.d';
import { useDispatch, useSelector } from 'react-redux';
import { IFilmContamination } from 'library/types/marineFarming.d';
import { applyFilter } from 'library/slices/marineFarming.slice';

interface IProps {}

const FilmContaminationFilter: React.FunctionComponent<IProps> = () => {
	const dispatch = useDispatch();

	const filters: CommonFilterDataType<IFilmContamination>[] = useSelector(selectFilters<IFilmContamination>(MarineFarmingDataType.FILM_CONTAMINATION));

	return (
		<Stack sx={{ width: '100%' }}>
			{filters.map((filter) => {
				if (filter.type === FilterType.LIST_SELECTOR) {
					return (
						<Filter
							type={FilterType.LIST_SELECTOR}
							key={`${filter.name}_${filter.field}`}
							name={filter.name}
							values={filter.items}
							checked={filter.selected}
							onChange={(value) => dispatch(applyFilter({
								dataType: MarineFarmingDataType.FILM_CONTAMINATION,
								field: filter.field,
								filter: filter.type,
								value,
							}))}
						/>
					);
				}

				if (filter.type === FilterType.DATE_TIME_RANGE) {
					return (
						<Filter
							type={FilterType.DATE_TIME_RANGE}
							key={`${filter.name}_${filter.field}`}
							name={filter.name}
							value={filter.selected}
							borders={filter.borders}
							onChange={(value) => dispatch(applyFilter({
								dataType: MarineFarmingDataType.FILM_CONTAMINATION,
								field: filter.field,
								filter: filter.type,
								value,
							}))}
						/>
					);
				}

				if (filter.type === FilterType.RANGE) {
					return (
						<Filter
							type={FilterType.RANGE}
							name={filter.name}
							value={filter.selected}
							borders={filter.borders}
							onChange={(value) => dispatch(applyFilter({
								dataType: MarineFarmingDataType.FILM_CONTAMINATION,
								field: filter.field,
								filter: filter.type,
								value,
							}))}
						/>
					);
				}

				return null;
			})}
		</Stack>
	);
};

export default FilmContaminationFilter;
