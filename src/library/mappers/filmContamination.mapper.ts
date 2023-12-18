import { v1 as uuid } from 'uuid';

import { IFilmContamination } from 'library/types/marineFarming.d';

export default (data: any): IFilmContamination[] => data?.map((datum: any) => ({
	id: datum.id ?? uuid(),
	time: datum.time ?? '',
	long: datum.long ?? 0,
	lat: datum.lat ?? 0,
	coordinates: `${datum.long}, ${datum.lat}`,
	icon: datum.icon ?? 'film-contamination',
}));
