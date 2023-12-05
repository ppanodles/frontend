export interface IShip {
    type: string;
    geometry: IGeometry;
    id: number;
    mmsi: number;
    imo?: number;
    vesselName: string; // наименование судна
    callsign: string;
    vesselType: string;
    vesselTypeCode?: number;
    vesselTypeCargo: string;
    vesselClass: string;
    length?: number;
    width?: number;
    flagCountry: string; // страна прописки
    flagCode: any;
    destination: string; // порт назначения
    eta?: string; // ожидаемое время прибытия
    draught?: number;
    longitude: number;
    latitude: number;
    sog: number;
    cog?: number;
    rot?: number;
    heading?: number;
    navStatus: string;
    navStatus_code?: number;
    source: string;
    tsPosUtc: string;
    tsStaticUtc: string;
    tsEta?: string;
    tsInsertUtc: string;
    registryName?: string;
    registryNameEn?: string;
    vesselTypeMain: string;
    vesselTypeSub: string;
    messageType: number;
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
