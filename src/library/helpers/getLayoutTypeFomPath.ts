import paths, { LayoutType } from 'library/paths';

// TODO заменить [marineFarming] на регулярку, чтоб для всех страниц использовать
// frontend/src/library/helpers/extractLayout.ts
export default (path: string): LayoutType | undefined => {
	if (path === paths.marineFarming[LayoutType.MAP]) {
		return LayoutType.MAP;
	}

	if (path === paths.marineFarming[LayoutType.TABLE]) {
		return LayoutType.TABLE;
	}

	if (path === paths.marineFarming[LayoutType.CHARTS]) {
		return LayoutType.CHARTS;
	}

	return undefined;
};
