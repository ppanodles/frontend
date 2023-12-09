import dayjs from 'dayjs';

export type Order = 'asc' | 'desc';

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

export function getComparator(
	order: Order,
	orderBy: { field: any, customFunction?:(a: any, b: any, orderByField: any) => 1 | -1 | 0 },
): (
	a: { [key: string]: number | string },
	b: { [key: string]: number | string }
  ) => number {
	if (orderBy?.customFunction !== undefined) {
		const { customFunction } = orderBy;

		return order === 'desc'
			? (a, b) => customFunction(a, b, orderBy.field)
			: (a, b) => -customFunction(a, b, orderBy.field);
	}

	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy.field)
		: (a, b) => -descendingComparator(a, b, orderBy.field);
}

export function stableSort(
	array: any[],
	comparator: (a: any, b: any) => number,
) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

export function dateSorting<T>(obj1: T, obj2: T, orderByField: keyof T) {
	const date1 = dayjs((obj1[orderByField] as string));
	const date2 = dayjs((obj2[orderByField] as string));

	if (date2.isBefore(date1)) {
		return -1;
	}
	if (date1.isBefore(date2)) {
		return 1;
	}
	return 0;
}
