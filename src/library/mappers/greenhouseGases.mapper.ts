import { v1 as uuid } from 'uuid';

import { IGreenhouseGases } from 'library/types/marineFarming.d';

export default (data: any): IGreenhouseGases[] => data?.map((datum: any) => ({
	time: datum?.date ?? uuid(),
	emissionLevel: datum?.emission_per_cell ?? 0,
	device: datum?.h3 ?? '',
})) ?? [];
