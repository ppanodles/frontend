import Map, { Layer, Source } from 'react-map-gl';
import type {
	FillLayer, MapRef,
} from 'react-map-gl';
import { cellToBoundary } from 'h3-js';

import { Feature, FeatureCollection } from 'geojson';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { MarineFarmingState } from 'library/slices/marineFarming.slice';

const layerStyle: FillLayer = {
	id: 'point',
	type: 'fill',
	paint: {
		'fill-outline-color': 'white',
		'fill-color': ['get', 'color'],
		'fill-opacity': ['get', 'opacity'],
	},
};

const getH3ColorByEmission = (emissionLevel: number): string => {
	if (emissionLevel < 142) {
		return 'yellow';
	}

	if (emissionLevel > 200) {
		return 'red';
	}

	return 'orange';
};

const mapGreenhouseGasesDataToFeatures = (data: {
    time: string;
    emissionLevel: number;
    device: string;
}, index: number): Feature => ({
	type: 'Feature',
	properties: {
		color: getH3ColorByEmission(data.emissionLevel),
		opacity: 1,
		id: index,
	},
	geometry: {
		type: 'Polygon',
		coordinates: [cellToBoundary(data.device, true)],
	},
});

const getGeoJsonFromData = ({greenhouseGases}: Omit<MarineFarmingState, 'filters'>): FeatureCollection => {
	const greenhouseGasesFeatures = greenhouseGases.map(mapGreenhouseGasesDataToFeatures);
	// const shipsFeatures = ships.map(mapShipsDataToFeatures);
	// const filmContaminationFeatures = filmContamination.map(mapFilmContaminationDataToFeatures);

	return {
		type: 'FeatureCollection',
		features: [...greenhouseGasesFeatures],
		// features: [...shipsFeatures, ...greenhouseGasesFeatures, ...filmContaminationFeatures],
	};
};

const DataMap = () => {
	const mapRefCallback = useCallback((ref: MapRef | null) => {
		if (ref !== null) {
			const map = ref;
			(map as any).setLanguage('ru');
		}
	}, []);
	const data = useSelector((state) => (state as {marineFarming: MarineFarmingState}).marineFarming);

	const geoJson = getGeoJsonFromData(
		{
			ships: data.ships,
			greenhouseGases: data.greenhouseGases,
			filmContamination: data.filmContamination,
		},
	);

	return (
		<div className="mainContainer">
			<div className="header">HEADER</div>
			<div className="mapContainer">
				<Map
					ref={mapRefCallback}
					mapboxAccessToken={process.env.ACCESS_TOKEN}
					initialViewState={{
						longitude: 74.99475713861449,
						latitude: 77.12867286602571,
						zoom: 7,
					}}
					style={{ width: 1200, height: 600 }}
					mapStyle="mapbox://styles/ea-dev/clpn3u19i010801po2evb0nto"
				>
					<Source id="my-data" type="geojson" data={geoJson}>
						<Layer {...layerStyle} />
					</Source>
				</Map>
			</div>
		</div>
	);
};

export default DataMap;
