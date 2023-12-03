import { LayoutType } from 'library/paths';

export default (url: string): LayoutType | null => {
	if (url.includes('/map')) return LayoutType.MAP;
	if (url.includes('/charts')) return LayoutType.CHARTS;
	if (url.includes('/table')) return LayoutType.TABLE;

	return null;
};
