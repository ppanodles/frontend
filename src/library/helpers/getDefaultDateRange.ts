export default (dates: Date[]): { from: Date, to: Date } => ({
	from: dates.reduce((a, b) => (a < b ? a : b)),
	to: dates.reduce((a, b) => (a > b ? a : b)),
});
