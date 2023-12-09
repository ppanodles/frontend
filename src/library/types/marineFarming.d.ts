export interface IShip {
    type: string;
    id: string;
    mmsi: number;
    imo?: number;
    vesselName: string; // наименование судна
    vesselType: string;
    flagCountry: string; // страна прописки
    destinationPort: string;
    destinationCoordinates: number[]// порт назначения
    eta: string; // ожидаемое время прибытия
    draught?: number;
    longitude: number;
    latitude: number;
    rot?: number;
    tsPosUtc: string;
    eta: string;
}

interface IGreenhouseGases {
    time: string;
    emissionLevel: number;
    device: string;
}

interface IEcoLocationState {
    id: number;
    time: string;
    temp: number;
    pressure: number;
    humidity: number;
    carbon: number;
    location: string;
}

interface IFilmContamination { // пленочное загрязнение
    id: string; // urn:ogc:def:crs:OGC:1.3:CRS84
    time: string; // Date
    long: number;
    lat: number;
}
