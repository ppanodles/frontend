import FilterType from 'library/constants/FilterType';

type Base<T> = {
    name: string;
    field: keyof T;
    shouldShowAlways?: boolean;
}

type IListSelectionFilter<T> = {
    type: FilterType.LIST_SELECTOR,
    items: Array<{ id: string, name: string }>
    selected: { [key: string]: string },
} & Base<T>;

type IRangeFilter<T> = {
    type: FilterType.RANGE,
    pepticColor?: string;
    borders: { from: number; to: number; };
    selected?: { from: number, to: number }
} & Base<T>;

type IDateTimeRangeFilter<T> = {
    type: FilterType.DATE_TIME_RANGE,
	borders: { from: string; to: string; };
    selected?: { from: string, to: string }
} & Base<T>;

type IDatePickFilter<T> = {
    type: FilterType.DATE_TIME_PICK,
    selected?: Date
} & Base<T>;

export type CommonFilterDataType<T> = IListSelectionFilter<T> | IRangeFilter<T> | IDateTimeRangeFilter<T> | IDatePickFilter<T>

export type IFilterDataType<T> = {
    [Key in FilterType]?: {
        [K in keyof T]?: CommonFilterDataType<T>;
    }
}
