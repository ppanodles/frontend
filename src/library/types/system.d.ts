import FilterType from 'library/constants/FilterType';

type BaseFilter<T> = {
    name: string;
    field: keyof T;
}

type IListSelectionFilter<T> = {
    type: FilterType.LIST_SELECTOR,
    value?: string[],
} & BaseFilter<T>;

type IRangeFilter<T> = {
    type: FilterType.RANGE,
    from?: number,
    to?: number,
} & BaseFilter<T>;

type IDateRangeFilter<T> = {
    type: FilterType.DATE_TIME_RANGE,
    from?: Date,
    to?: Date,
} & BaseFilter<T>;

type IDatePickFilter<T> = {
    type: FilterType.DATE_TIME_PICK,
    selectedDate?: Date
} & BaseFilter<T>;

export type IFilterType<T> = IListSelectionFilter<T> |
    IRangeFilter<T> |
    IDateRangeFilter<T> |
    IDatePickFilter<T>;
