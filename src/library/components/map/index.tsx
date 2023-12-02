import Map, { Layer, Source } from 'react-map-gl';
import type {
	FillLayer, MapRef,
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { MarineFarmingState } from 'library/slices/marineFarming.slice';
import { getGeoJsonFromData } from './helpers';

const layerStyle: FillLayer = {
	id: 'point',
	type: 'fill',
	paint: {
		'fill-outline-color': 'white',
		'fill-color': ['get', 'color'],
		'fill-opacity': ['get', 'opacity'],
	},
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
