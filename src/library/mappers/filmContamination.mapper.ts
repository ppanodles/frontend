import { IFilmContamination } from 'library/types/marineFarming';

export default (data: any): IFilmContamination[] => data?.map((datum: any) => ({
	type: datum?.type || 'Нефть',
	id: datum.id ?? 'urn:ogc:def:crs:OGC:1.3:CRS84',
	time: datum.time ?? '',
	name: datum.name ?? '',
	geometry: {
		type: datum?.geometry?.type,
		coordinates: datum?.geometry?.coordinates,
	},
}));
