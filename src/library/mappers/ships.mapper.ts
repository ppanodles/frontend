import { IShip } from 'library/types/MarineFarming/index.d';

export default (data: any): IShip[] => data?.map((datum: any) => ({
	type: datum.type ?? '',
	id: datum?.properties?.id ?? 0,
	mmsi: datum?.properties?.mmsi ?? 0,
	imo: datum?.properties?.imo,
	vesselName: datum?.properties?.vessel_name ?? '',
	callsign: datum?.properties?.callsign ?? '',
	vesselType: datum?.properties?.vessel_type ?? '',
	vesselTypeCode: datum?.properties?.vessel_type_code,
	vesselTypeCargo: datum?.properties?.vessel_type_cargo ?? '',
	vessel_class: datum?.properties?.vessel_class ?? '',
	length: datum?.properties?.length,
	width: datum?.properties?.width,
	flagCountry: datum?.properties?.flag_country ?? '',
	flagCode: datum?.properties?.flag_code ?? 'non',
	destination: datum?.properties?.destination ?? '',
	eta: datum?.properties?.eta,
	draught: datum?.properties?.draught,
	longitude: datum?.properties?.longitude ?? 0,
	latitude: datum?.properties?.latitude ?? 0,
	sog: datum?.properties?.sog ?? 0,
	cog: datum?.properties?.cog,
	rot: datum?.properties?.rot,
	heading: datum?.properties?.heading,
	navStatus: datum?.properties?.nav_status ?? '',
	navStatusCode: datum?.properties?.nav_status_code,
	source: datum?.properties?.source ?? '',
	tsPosUtc: datum?.properties?.ts_pos_utc ?? '',
	tsStaticUtc: datum?.properties?.ts_static_utc ?? '',
	tsEta: datum?.properties?.ts_eta,
	tsInsertUtc: datum?.properties?.ts_insert_utc ?? '',
	registryName: datum?.properties?.registry_name,
	registryNameEn: datum?.properties?.registry_name_en,
	vesselTypeMain: datum?.properties?.vessel_type_main ?? '',
	vesselTypeSub: datum?.properties?.vessel_type_sub ?? '',
	messageType: datum?.properties?.message_type ?? 0,
	geometry: {
		type: datum?.geometry?.type ?? '',
		coordinates: datum?.geometry?.coordinates ?? [0, 0],
	},
})) ?? [];
