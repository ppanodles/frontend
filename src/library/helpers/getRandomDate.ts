import dayjs from 'dayjs';

export default () => {
	// get a random year between 2020 and 2023
	const year = Math.floor(Math.random() * (2023 - 2019 + 1)) + 2019;
	// get a random month between 0 and 11
	const month = Math.floor(Math.random() * 12);
	// get a random day between 1 and the maximum number of days in the selected month and year
	const daysInMonth = new Date(year, month + 1, 0).getDate();
	const day = Math.floor(Math.random() * daysInMonth) + 1;
	// create a new Date object with the random year, month, and day
	const randomDate = new Date(year, month, day);

	return dayjs(randomDate).toString();
};
