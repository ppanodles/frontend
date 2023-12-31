import React from 'react';
import FilterType from 'library/constants/FilterType';
import ListSelectorFilter, { IListSelectorFilter } from './ListSelectorFilter';
import RangeFilter, { IRangeFilter } from './RangeFilter';
import DateTimeRangeFilter, { IDateTimeRangeFilter } from './DateTimeRangeFilter';
import SelectOneFilter, { ISelectOneFilter } from './SelectOneFilter';

type IProps =
    IListSelectorFilter & { type: FilterType.LIST_SELECTOR }
    | IRangeFilter & { type: FilterType.RANGE }
    | IDateTimeRangeFilter & { type: FilterType.DATE_TIME_RANGE }
    | { type: FilterType.DATE_TIME_PICK }
	| ISelectOneFilter & {type: FilterType.SELECT_ONE}

const Filter: React.FunctionComponent<IProps> = (props) => {
	switch (props.type) {
	case FilterType.LIST_SELECTOR:
		return <ListSelectorFilter {...props} />;
	case FilterType.RANGE:
		return <RangeFilter {...props} />;
	case FilterType.DATE_TIME_RANGE:
		return <DateTimeRangeFilter {...props} />;
	case FilterType.SELECT_ONE:
		return <SelectOneFilter {...props} />;
	default:
		return null;
	}
};

export default Filter;
