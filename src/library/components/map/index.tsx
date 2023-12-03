/* eslint-disable import/no-unresolved */
/* eslint-disable max-len */
import Map, { Layer, Marker, Source } from 'react-map-gl';
import type { FillLayer, MapRef } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ReactElement, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { MarineFarmingState } from 'library/slices/marineFarming.slice';
import { IFilmContamination, IShip } from 'library/types/marineFarming';
import { getGeoJsonFromData } from './helpers';
import ShipPopup from './components/ShipPopup';
import FilmContaminationPopup from './components/FilmContaminationPopup';

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
	const { greenhouseGases, filmContamination, ships } = useSelector(
		(state) => (state as { marineFarming: MarineFarmingState }).marineFarming,
	);

	const [popup, setPopup] = useState<ReactElement | null>(null);

	const mapShipsDataToMarkers = (shipInfo: IShip) => (
		<Marker
			onClick={() => setPopup(<ShipPopup info={shipInfo} onClose={() => setPopup(null)} />)}
			key={shipInfo.id}
			longitude={shipInfo.geometry.coordinates[0]}
			latitude={shipInfo.geometry.coordinates[1]}
			anchor="bottom"
		>
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M19 5L5 10.8567V11.6189L10.32 13.68L12.3733 19H13.1356L19 5Z" fill="#00E5FF" />
			</svg>
		</Marker>
	);

	const mapFilmContaminationToMarkers = (filmContaminationInfo: IFilmContamination) => (
		<Marker
			onClick={() => setPopup(
				<FilmContaminationPopup info={filmContaminationInfo} onClose={() => setPopup(null)} />,
			)}
			longitude={filmContaminationInfo.geometry.coordinates[0][0]}
			latitude={filmContaminationInfo.geometry.coordinates[0][1]}
			anchor="top-left"
		>
			<svg
				width="50"
				height="50"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M2.975 11.9h-.097a2.878 2.878 0 1 0 0 5.757h6.045a2.975 2.975 0 0 1 2.975 2.975v.097a2.878 2.878 0 1 0 5.757 0v-6.142a2.975 2.975 0 0 1 2.975-2.975h.143a2.83 2.83 0 1 0 0-5.66h-.143a2.975 2.975 0 0 1-2.975-2.975V2.88a2.875 2.875 0 1 0-5.755-.002v.097c0 1.643-1.332 2.975-2.975 2.975S5.95 7.282 5.95 8.925 4.618 11.9 2.975 11.9Z"
					fill="#FF9315"
					opacity={0.2}
				/>
			</svg>
		</Marker>
	);

	const geoJson = getGeoJsonFromData(greenhouseGases);

	const filtredShips = ships.filter((ship, index) => {
		if (index === 0) {
			return true;
		}
		const prevCords = ships[index - 1].geometry.coordinates[0] + ships[index - 1].geometry.coordinates[1];
		const currCords = ship.geometry.coordinates[0] + ship.geometry.coordinates[1];

		return Math.round(prevCords - currCords) > 1 || Math.round(currCords - prevCords) > 1;
	});

	const shipMarkers = filtredShips.slice(0, 500).map(mapShipsDataToMarkers);
	const filmContaminationMarkers = filmContamination.map(mapFilmContaminationToMarkers);

	return (
		<Map
			ref={mapRefCallback}
			mapboxAccessToken={process.env.REACT_APP_ACCESS_TOKEN}
			initialViewState={{
				longitude: 57.6087,
				latitude: 70.939,
				zoom: 4,
			}}
			maxZoom={8}
			minZoom={4}
			style={{ width: '100%', height: '100%' }}
			mapStyle="mapbox://styles/ea-dev/clpn3u19i010801po2evb0nto"
		>
			{filmContaminationMarkers}
			{shipMarkers}
			{popup}
			<Source id="my-data" type="geojson" data={geoJson}>
				<Layer {...layerStyle} />
			</Source>
		</Map>
	);
};

export default DataMap;
