const MARINE_FARMING_BASE = '/frontend/app/marine-farming/';
const AGRO_INDUSTRY_BASE = '/frontend/app/agro-industry/';
const MUNICIPALITY = '/frontend/app/municipality/';

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
		charts: `${AGRO_INDUSTRY_BASE}charts`,
		table: `${AGRO_INDUSTRY_BASE}table`,
	},
	municipality: {
		base: MUNICIPALITY,
		charts: `${MUNICIPALITY}charts`,
		table: `${MUNICIPALITY}table`,
	},
};

export default paths;
