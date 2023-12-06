import FilterType from 'library/constants/FilterType';

type Base<T> = {
    name: string;
    field: keyof T;
    shouldShowAlways?: boolean;
}

type IListSelectionFilter<T> = {
    type: FilterType.LIST_SELECTOR,
    items: Array<{ id: string, name: string }>
    selected: { [key: string]: boolean },
} & Base<T>;

type IRangeFilter<T> = {
    type: FilterType.RANGE,
    value?: {
        from: number,
        to: number,
    }
} & Base<T>;

type IDateTimeRangeFilter<T> = {
    type: FilterType.DATE_TIME_RANGE,
	borders: { from: Date; to: Date; };
    value?: { from: Date, to: Date }
} & Base<T>;

type IDatePickFilter<T> = {
    type: FilterType.DATE_TIME_PICK,
    value?: Date
} & Base<T>;

export type CommonFilterDataType<T> = IListSelectionFilter<T> | IRangeFilter<T> | IDateTimeRangeFilter<T> | IDatePickFilter<T>

export type IFilterDataType<T> = {
    [K in keyof T]?: {
        [Key in FilterType]?: CommonFilterDataType<T>;
    }
}
