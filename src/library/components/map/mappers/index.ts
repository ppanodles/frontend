/* eslint-disable import/prefer-default-export */
import { Feature } from 'geojson';
import { cellToBoundary } from 'h3-js';
import { getH3ColorByEmission } from '../helpers';

export const mapGreenhouseGasesDataToFeatures = (data: {
    time: string;
    emissionLevel: number;
    device: string;
}, index: number): Feature => ({
	type: 'Feature',
	properties: {
		color: getH3ColorByEmission(data.emissionLevel),
		opacity: 1,
		id: index,
	},
	geometry: {
		type: 'Polygon',
		coordinates: [cellToBoundary(data.device, true)],
	},
});
