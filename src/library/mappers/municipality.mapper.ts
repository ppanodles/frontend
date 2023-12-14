import { v1 as uuid } from 'uuid';

import { IMunicipalityState } from 'library/types/municipality.d';

export default (data: any): IMunicipalityState[] => data?.map((datum: any) => ({
	id: uuid(),
	time: datum?.time ?? new Date(),
	temp: datum?.temp ?? 0,
	pressure: datum?.pressure ? Number(datum?.pressure) / 1000 : 0,
	humidity: datum?.humidity ?? 0,
	carbon: datum?.carbon ?? 0,
	location: datum?.name ?? 'Наименование неизвестно',
})) ?? [];
