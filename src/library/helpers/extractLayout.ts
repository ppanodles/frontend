import { LayoutType } from 'library/paths';

export default (url: string): LayoutType | null => {
	const lastSector = url.split('/').reverse()[0];
	if (lastSector === 'map') return LayoutType.MAP;
	if (lastSector === 'charts') return LayoutType.CHARTS;
	if (lastSector === 'table') return LayoutType.TABLE;

	return null;
};
