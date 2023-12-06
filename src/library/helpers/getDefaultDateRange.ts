import dayjs from 'dayjs';

export default (data: string[]): { from: string, to: string } => {
	const dates = data.map((datum) => (dayjs(datum)));

	return ({
		from: dates.reduce((a, b) => (a.isBefore(b) ? a : b)).toString(),
		to: dates.reduce((a, b) => (a.isAfter(b) ? a : b)).toString(),
	});
};
