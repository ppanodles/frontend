/* eslint-disable import/prefer-default-export */
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
