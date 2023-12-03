const MARINE_FARMING_BASE = '/app/marine-farming/';
const AGRO_INDUSTRY_BASE = '/app/agro-industry/';
const MUNICIPALITY = '/app/municipality/';

export default {
	marineFarming: {
		base: MARINE_FARMING_BASE,
		map: `${MARINE_FARMING_BASE}map`,
		charts: `${MARINE_FARMING_BASE}charts`,
		table: `${MARINE_FARMING_BASE}table`,
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
