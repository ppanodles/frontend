import { v1 as uuid } from 'uuid';

import { IMunicipalityState } from 'library/types/municipality';

export default (data: any): IMunicipalityState[] => data?.map((datum: any) => ({
	id: datum?.id ?? uuid(),
	time: datum?.time ?? '',
	temp: datum?.temp ?? 0,
	pressure: datum?.pressure ?? 0,
	humidity: datum?.humidity ?? 0,
	carbon: datum?.carbon ?? 0,
	location: datum?.location ?? 'Наименование неизвестно',
})) ?? [];
