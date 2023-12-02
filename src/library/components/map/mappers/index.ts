/* eslint-disable import/prefer-default-export */
import { Feature } from 'geojson';
import { cellToBoundary } from 'h3-js';
import { getFilmContaminationColorByType, getH3ColorByEmission } from '../helpers';

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

export const mapFilmContaminationDataToFeatures = ({id, geometry, type}: {
    type: 'Нефть' | 'Нефтепродукты' | 'Масла' | 'Естественные' | 'Сточные';
    id: string;
    time: string;
    name: string;
    properties: {
        Id: number;
        Area: number;
        long: number;
        lat: number;
      }
    geometry: {
        type: string;
        coordinates: number[][];
    }
}): Feature => ({
	type: 'Feature',
	properties: {
		color: getFilmContaminationColorByType(type),
		opacity: 0.2,
		id,
	},
	geometry: {
		type: 'MultiLineString',
		coordinates: [geometry.coordinates],
	},
});
