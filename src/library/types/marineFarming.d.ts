export interface IShip {
    type: string;
    id: number;
    mmsi: number;
    imo?: number;
    vesselName: string; // наименование судна
    vesselType: string;
    flagCountry: string; // страна прописки
    destination: {
        port: string;
        coordinates: number[]
    }; // порт назначения
    longitude: number;
    latitude: number;
    rot?: number;
    tsPosUtc: string;
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
