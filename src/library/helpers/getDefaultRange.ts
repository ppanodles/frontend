import {min, max} from 'lodash';

export default (numbers: number[]): { from: number, to: number } => {
	const from = min(numbers);
	const to = max(numbers);

	return ({
		from: from ? Math.floor(from) : 0,
		to: to ? Math.ceil(to) : 0,
	});
};
