import FilterType from 'library/constants/FilterType';

type BaseFilter<T> = {
    field: keyof T;
}

type IListSelectionFilter<T> = {
    type: FilterType.LIST_SELECTOR,
    value: string[],
} & BaseFilter<T>;

type IRangeFilter<T> = {
    type: FilterType.RANGE,
    from: number,
    to: number,
} & BaseFilter<T>;

type IDateRangeFilter<T> = {
    type: FilterType.RANGE,
    from: Date,
    to: Date,
} & BaseFilter<T>;

type IDatePickFilter<T> = {
    type: FilterType.RANGE,
    selectedDate: Date
} & BaseFilter<T>;

export type IFilterType<T> = IListSelectionFilter<T> |
    IRangeFilter<T> |
    IDateRangeFilter<T> |
    IDatePickFilter<T>;
