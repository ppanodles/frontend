import { IFilmContamination } from 'library/types/marineFarming.d';

let result: IFilmContamination[] = [];

export default (data: any): IFilmContamination[] => {
	data?.forEach((datum: any) => {
		datum.coordinates.forEach((coordinate: any, i: number) => {
			result = [...result, {
				id: `${datum.id}-${i}`, long: coordinate.long, lat: coordinate.lat, time: coordinate.time, coordinates: `${coordinate.long}, ${coordinate.lat}`,
			} as IFilmContamination];
		});
	});
	return result;
};
