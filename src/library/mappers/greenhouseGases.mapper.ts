import { v1 as uuid } from 'uuid';

import { IGreenhouseGases } from 'library/types/marineFarming.d';

export default (data: any): IGreenhouseGases[] => data?.map((datum: any) => ({
	id: uuid(),
	time: datum?.date ?? ['Thu, 18 Jun 2020 21:00:00',
		'Thu, 11 Jun 2020 21:00:00',
		'Wed, 08 Nov 2023 21:00:00',
		'Fri, 24 Mar 2023 21:00:00',
		'Mon, 29 Jun 2020 21:00:00',
		'Fri, 09 Jun 2023 21:00:00'][Math.floor(Math.random() * 6)],
	emissionLevel: datum?.emission_per_cell ?? 0,
	emissionValue: datum?.emission_per_cell ?? 0,
	device: datum?.h3 ?? '',
})) ?? [];
