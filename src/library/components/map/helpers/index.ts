/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
import { IShip } from 'library/types/marineFarming.d';

/* eslint-disable import/prefer-default-export */
type H3Colors = '#880E4F' | '#C2185B' | '#DD2C00' | '#FF9100' | '#FFC400' | '#FFEB3B'
type FilmContaminationColors = '#FF9315' | '#22C38E' | '#304FFE'

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
export const getFilmContaminationColorByType = (type: 'Нефть' | 'Нефтепродукты' | 'Масла' | 'Естественные' | 'Сточные'): FilmContaminationColors => {
	if (type === 'Нефть' || type === 'Масла' || type === 'Нефтепродукты') {
		return '#FF9315';
	}

	if (type === 'Сточные') {
		return '#304FFE';
	}

	return '#22C38E';
};

export const getFiltredShips = (data: any[]): IShip[] => {
	const names: any = [];
	const res = [];

	for (let i = 0; i < data.length - 1; i++) {
	  if (!names.includes(data[i].vesselName) && data[i].vesselName !== '') {
			names.push(data[i].vesselName);
			res.push({...data[i], rot: Math.floor(Math.random() * 360)});
	  }
	}

	return res;
};
