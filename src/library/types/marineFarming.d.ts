import { IconNames } from 'resources/icons';

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
    id: string;
    time: string;
    emissionLevel: number;
    emissionValue: number;
    device: string;
}

interface IFilmContamination { // пленочное загрязнение
    id: string; // urn:ogc:def:crs:OGC:1.3:CRS84
    time: string; // Date
    long: number;
    lat: number;
    coordinates: string;
    icon: IconNames;
}

interface IMetal {
    name: string;
    label: string;
    underworld:number;
    surface: number;
    leap: number;
}

interface IMonitoringStation {
    id: string
    name: string;
    long: number;
    lat: number;
    metals: IMetal[]
}
