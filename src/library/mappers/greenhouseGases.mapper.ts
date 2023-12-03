import { IGreenhouseGases } from 'library/types/marineFarming.d';

export default (data: any): IGreenhouseGases[] => data?.map((datum: any) => ({
	time: datum?.time ?? '',
	emissionLevel: datum?.emission_per_cell ?? 0,
	device: datum?.h3 ?? '',
})) ?? [];
