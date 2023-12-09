import { v1 as uuid } from 'uuid';

import { IEcoCityState } from 'library/types/ecoCity.d';

export default (data: any): IEcoCityState[] => data?.map((datum: any) => ({
	id: datum?.id ?? uuid(),
	time: datum?.time ?? '',
	temp: datum?.temp ?? 0,
	pressure: datum?.pressure ?? 0,
	humidity: datum?.humidity ?? 0,
	carbon: datum?.carbon ?? 0,
	location: datum?.location ?? 'Наименование неизвестно',
})) ?? [];
