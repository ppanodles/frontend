import { v1 as uuid } from 'uuid';

import { IMonitoringStation } from 'library/types/marineFarming.d';

export default (data: any): IMonitoringStation[] => data?.map((datum: any) => ({
	id: uuid(),
	name: datum?.station ?? '',
	long: datum?.coordinates[1] ?? 0,
	lat: datum?.coordinates[0] ?? 0,
	metals: datum?.indications ? datum?.indications.map((metal: any) => ({
		name: metal?.name ?? '',
		label: metal?.abbreviation ?? '',
		underworld: Number(metal?.data?.bottom) ?? 0,
		surface: Number(metal?.data?.surface) ?? 0,
		leap: Number(metal?.data?.jump) ?? 0,
	})) : [],
})) ?? [];
