import { IEcoFarmlandState } from 'library/types/ecoFarmland';

export default (data: any): IEcoFarmlandState[] => data?.map((datum: any) => ({
	id: datum?.id ?? '1',
	time: datum?.time ?? '',
	temp: datum?.temp ?? 0,
	pressure: datum?.pressure ?? 0,
	humidity: datum?.humidity ?? 0,
	carbon: datum?.carbon ?? 0,
	location: datum?.location ?? 'Наименование неизвестно',
})) ?? [];
