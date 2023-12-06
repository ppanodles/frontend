/* eslint-disable import/prefer-default-export */
export interface IPort {
    name: string;
    cords: number[];
}

export const ports: IPort[] = [
	{
		name: 'Мурманск',
		cords: [33.083792, 68.974705],
	},
	{
		name: 'Архангельск',
		cords: [40.522246, 64.539871],
	},
	{
		name: 'Калининград',
		cords: [20.261238, 54.846789],
	},
];
