import { v1 as uuid } from 'uuid';

import { IMonitoringStation } from 'library/types/marineFarming.d';

export default (data: any): IMonitoringStation[] => data?.map((datum: any) => ({
	id: uuid(),
	name: datum?.name ?? '',
	long: datum?.long ?? 0,
	lat: datum?.lat ?? 0,
	metals: datum?.metals ? datum?.metals.map((metal: any) => ({
		name: metal?.name ?? '',
		label: metal?.label ?? '',
		underworld: metal?.underworld ?? 0,
		surface: metal?.surface ?? 0,
		leap: metal?.leap ?? 0,
	})) : [],
})) ?? [];
