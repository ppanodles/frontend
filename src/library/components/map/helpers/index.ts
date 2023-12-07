type H3Colors = '#880E4F' | '#C2185B' | '#DD2C00' | '#FF9100' | '#FFC400' | '#FFEB3B'

export const getH3ColorByEmission = (emissionLevel: number): H3Colors => {
	if (emissionLevel < 294.7) {
		return '#880E4F';
	}

	if (emissionLevel < 612.2) {
		return '#C2185B';
	}

	if (emissionLevel < 1107.14) {
		return '#DD2C00';
	}

	if (emissionLevel < 2082.9) {
		return '#FF9100';
	}

	if (emissionLevel < 5347.57) {
		return '#FFC400';
	}

	return '#FFEB3B';
};

export const getFormattedDate = (dateUTC: string): {fullDate: string, time:string} => {
	const [date, time] = dateUTC.split(' ');
	const parts = date.split('-').map((d) => Number(d));
	const fullDate = new Date(parts[0], parts[1] - 1, parts[2]);
	const formattedDate = `${fullDate.getDate().toString().padStart(2, '0')}.${(fullDate.getMonth() + 1).toString().padStart(2, '0')}.${fullDate.getFullYear()}`;

	return {
		fullDate: formattedDate,
		time: time.substring(0, 5),
	};
};
