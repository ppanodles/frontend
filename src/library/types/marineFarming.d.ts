export interface IShip {
    type: string;
    geometry: IGeometry;
    id: number;
    mmsi: number;
    imo?: number;
    vessel_name: string;
    callsign: string;
    vessel_type: string;
    vessel_type_code?: number;
    vessel_type_cargo: string;
    vessel_class: string;
    length?: number;
    width?: number;
    flag_country: string; // страна прописки
    flag_code: any;
    destination: string; // порт назначения
    eta?: string; // ожидаемое время прибытия
    draught?: number;
    longitude: number;
    latitude: number;
    sog: number;
    cog?: number;
    rot?: number;
    heading?: number;
    nav_status: string;
    nav_status_code?: number;
    source: string;
    ts_pos_utc: string;
    ts_static_utc: string;
    ts_eta?: string;
    ts_insert_utc: string;
    registry_name?: string;
    registry_name_en?: string;
    vessel_type_main: string;
    vessel_type_sub: string;
    message_type: number;
}

export interface IGeometry {
    type: string;
    coordinates: number[];
}

interface IGreenhouseGases {
    time: string;
    emissionLevel: number;
    device: string;
}

interface IFilmContamination { // пленочное загрязнение
    type: 'Нефть' | 'Нефтепродукты' | 'Масла' | 'Естественные' | 'Сточные';
    id: string; // urn:ogc:def:crs:OGC:1.3:CRS84
    time: string; // Date
    name: string;
    properties: {
        Id: number;
        Area: number;
        long: number;
        lat: number;
      }
    geometry: {
        type: string;
        coordinates: number[][];
    }
}
