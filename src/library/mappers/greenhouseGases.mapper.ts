import { v1 as uuid } from 'uuid';

import { IGreenhouseGases } from 'library/types/marineFarming.d';

export default (data: any): IGreenhouseGases[] => data?.map((datum: any) => ({
	id: uuid(),
	time: datum?.date ?? new Date(),
	emissionLevel: datum?.emission_per_cell ?? 0,
	emissionValue: datum?.emission_per_cell ?? 0,
	device: datum?.h3 ?? '',
})) ?? [];
