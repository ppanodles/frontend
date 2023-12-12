const BASE = '/app';
const MARINE_FARMING_BASE = `${BASE}/app/marine-farming/`;
const AGRO_INDUSTRY_BASE = `${BASE}/app/agro-industry/`;
const MUNICIPALITY = `${BASE}/app/municipality/`;

// eslint-disable-next-line no-shadow
export enum LayoutType {
    MAP ='MAP',
    CHARTS ='CHARTS',
    TABLE = 'TABLE',
}

const paths = {
	marineFarming: {
		base: MARINE_FARMING_BASE,
		[LayoutType.MAP]: `${MARINE_FARMING_BASE}map`,
		[LayoutType.CHARTS]: `${MARINE_FARMING_BASE}charts`,
		[LayoutType.TABLE]: `${MARINE_FARMING_BASE}table`,
	},
	agroIndustry: {
		base: AGRO_INDUSTRY_BASE,
		[LayoutType.CHARTS]: `${AGRO_INDUSTRY_BASE}charts`,
		[LayoutType.TABLE]: `${AGRO_INDUSTRY_BASE}table`,
	},
	municipality: {
		base: MUNICIPALITY,
		[LayoutType.CHARTS]: `${MUNICIPALITY}charts`,
		[LayoutType.TABLE]: `${MUNICIPALITY}table`,
	},
	about: `${BASE}/about`,
};

export default paths;
