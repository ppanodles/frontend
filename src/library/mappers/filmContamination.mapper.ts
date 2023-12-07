import { IFilmContamination } from 'library/types/marineFarming.d';

export default (data: any): IFilmContamination[] => data?.map((datum: any) => ({
	id: datum.id ?? 'urn:ogc:def:crs:OGC:1.3:CRS84',
	time: datum.time ?? '',
	long: datum.long ?? 0,
	lat: datum.lat ?? 0,
}));
