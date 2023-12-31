import FilterType from 'library/constants/FilterType';

export type ListSelectorPayload<T, P> = {
    dataType: T;
	field: P;
	filter: FilterType.LIST_SELECTOR;
	value: {[key: string]: string};
}

export type SelectOnePayload<T, P> = {
    dataType: T;
	field: P;
	filter: FilterType.SELECT_ONE;
	value: {id: string, name: string};
}

export type DateTimeRangePayload<T, P> = {
    dataType: T;
	field: P;
	filter: FilterType.DATE_TIME_RANGE;
	value: { from: string; to: string };
}

export type DateTimePickPayload<T, P> = {
    dataType: T;
	field: P;
	filter: FilterType.DATE_TIME_PICK;
	value: Date;
}

export type RangePayload<T, P> = {
    dataType: T;
	field: P;
	filter: FilterType.RANGE;
	value: {
        from: number;
        to: number;
    };
}
