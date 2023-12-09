export default (type: 'first' | 'last' | 'next' | 'previous') => {
	switch (type) {
	case 'first':
		return 'первая';
	case 'last':
		return 'последняя';
	case 'next':
		return 'следующая';
	case 'previous':
		return 'предыдущая';
	default:
		return '';
	}
};
