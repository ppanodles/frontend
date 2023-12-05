/* eslint-disable import/no-unresolved */
/* eslint-disable max-len */
import Map, { Layer, Marker, Source} from 'react-map-gl';
import type { FillLayer, MapRef } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {
	ReactElement, useCallback, useMemo, useState,
} from 'react';
import { useSelector } from 'react-redux';

import { IFilmContamination, IShip } from 'library/types/marineFarming';
import { RootState } from 'main/rootReducer';
import { getFiltredShips, getGeoJsonFromData} from './helpers';
import ShipPopup from './components/popups/ShipPopup';
import FilmContaminationPopup from './components/popups/FilmContaminationPopup';
import Icon from '../Icon/index';

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

	const {
		greenhouseGases, filmContamination, ships, slicesAccessibility,
	} = useSelector((state: RootState) => state.marineFarming);

	const [popup, setPopup] = useState<ReactElement | null>(null);

	// const mapGreenhouseGasesToMarkers = (greenhouseGasesInfo: IGreenhouseGases) => {
	// 	const color = getH3ColorByEmission(greenhouseGasesInfo.emissionLevel);

	// 	return (
	// 		<Marker
	// 			key={greenhouseGasesInfo.time}
	// 			longitude={cellToBoundary(greenhouseGasesInfo.device, true)[0][0]}
	// 			latitude={cellToBoundary(greenhouseGasesInfo.device, true)[0][1]}
	// 			anchor="bottom"
	// 		>
	// 			<svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	// 				<g opacity="0.9">
	// 					<path d="M12 4L19 7.57143V15.4286L12 19L5 15.4286V7.57143L12 4Z" fill={color} />
	// 				</g>
	// 			</svg>
	// 		</Marker>
	// 	);
	// };

	const mapShipsDataToMarkers = (shipInfo: IShip) => (
		<Marker
			onClick={() => setPopup(<ShipPopup
				coordinates={[shipInfo.geometry.coordinates[0], shipInfo.geometry.coordinates[1]]}
				name={(shipInfo as any).registryName}
				onClose={() => setPopup(null)}
			/>)}
			key={shipInfo.id}
			longitude={shipInfo.geometry.coordinates[0]}
			latitude={shipInfo.geometry.coordinates[1]}
			anchor="bottom"
			rotation={shipInfo.rot}
		>
			<Icon iconName="ship-marker" />
		</Marker>
	);

	const mapFilmContaminationToMarkers = (filmContaminationInfo: IFilmContamination) => (
		<Marker
			onClick={() => setPopup(
				<FilmContaminationPopup
					coordinates={[filmContaminationInfo.geometry.coordinates[0][0], filmContaminationInfo.geometry.coordinates[0][1]]}
					type={filmContaminationInfo.type}
					onClose={() => setPopup(null)}
				/>,
			)}
			longitude={filmContaminationInfo.geometry.coordinates[0][0]}
			latitude={filmContaminationInfo.geometry.coordinates[0][1]}
			anchor="top-left"
		>
			<Icon iconName="film-contamination" />
		</Marker>
	);

	const geoJson = getGeoJsonFromData(greenhouseGases);

	const shipMarkers = useMemo(() => getFiltredShips(ships).map(mapShipsDataToMarkers), [ships]);

	const filmContaminationMarkers = filmContamination.map(mapFilmContaminationToMarkers);
	// const greenhouseGasesMarkers = greenhouseGases.map(mapGreenhouseGasesToMarkers);

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
			doubleClickZoom={false}
			style={{ width: '100%', height: '100%' }}
			mapStyle="mapbox://styles/ea-dev/clpn3u19i010801po2evb0nto"
		>
			{slicesAccessibility.FILM_CONTAMINATION && filmContaminationMarkers}
			{slicesAccessibility.SHIPS && shipMarkers}
			{popup}
			{/* {greenhouseGasesMarkers} */}
			{slicesAccessibility.GREENHOUSE_GASES && (
				<Source id="my-data" type="geojson" data={geoJson}>
					<Layer {...layerStyle} />
				</Source>
			)}
		</Map>
	);
};

export default DataMap;
