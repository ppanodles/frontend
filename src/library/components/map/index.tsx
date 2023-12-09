/* eslint-disable import/no-unresolved */
import Map, {
	Layer, Marker, Source, NavigationControl,
} from 'react-map-gl';
import type { FillLayer, MapRef } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {
	ReactElement, useCallback, useMemo, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { IFilmContamination, IShip } from 'library/types/marineFarming';
import { RootState } from 'main/rootReducer';
import * as turf from '@turf/turf';
import selectFilteredShips from 'library/selectors/ships.selector';
import { Box } from '@mui/material';
import { latLngToCell } from 'h3-js';
import ShipPopup from './components/popups/ShipPopup';
import FilmContaminationPopup from './components/popups/FilmContaminationPopup';
import Icon from '../Icon/index';
import { mapGreenhouseGasesDataToFeatures } from './mappers';
import GreenhouseGasePopup from './components/popups/GreenhouseGasePopup';
import PortPopup from './components/popups/PortPopup';
import GasesInfoTable from './components/GasesInfoTable';

import './styles.css';

(window as any).latLngToCell = latLngToCell;

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
	const [popup, setPopup] = useState<ReactElement | null>(null);
	const mapRefCallback = useCallback((ref: MapRef | null) => {
		if (ref !== null) {
			const map = ref;
			(map as any).setLanguage('ru');
		}
	}, []);

	const {
		greenhouseGases, filmContamination, slicesStatus: slicesAccessibility,
	} = useSelector(
		(state: RootState) => state.marineFarming,
	);

	const ships = useSelector(selectFilteredShips);

	const ports = useMemo(
		() => ships
			.map((ship) => ({
				port: ship.destinationPort,
				coordinates: ship.destinationCoordinates,
			}))
			.filter((value, index, self) => self.findIndex((v) => v.port === value.port) === index),
		[ships],
	);

	const mapShipsDataToMarkers = useCallback(
		(shipInfo: IShip) => (
			<Marker
				onClick={() => setPopup(
					<ShipPopup
						coordinates={[shipInfo.longitude, shipInfo.latitude]}
						destination={shipInfo.destinationPort}
						imo={
							shipInfo.imo
								? shipInfo.imo.toString().substring(0, 7)
								: shipInfo.mmsi.toString().substring(0, 7)
						}
						mmsi={shipInfo.mmsi.toString().substring(0, 7)}
						name={shipInfo.vesselName}
						dateUTC={shipInfo.tsPosUtc}
						onClose={() => setPopup(null)}
					/>,
				)}
				key={shipInfo.id}
				longitude={shipInfo.longitude}
				latitude={shipInfo.latitude}
				anchor="bottom"
				rotation={shipInfo.rot}
			>
				<Icon iconName="ship-marker" />
			</Marker>
		),
		[],
	);

	const mapFilmContaminationToMarkers = useCallback(
		(filmContaminationInfo: IFilmContamination) => (
			<Marker
				onClick={() => setPopup(
					<FilmContaminationPopup
						coordinates={[filmContaminationInfo.long, filmContaminationInfo.lat]}
						onClose={() => setPopup(null)}
						date={filmContaminationInfo.time}
					/>,
				)}
				longitude={filmContaminationInfo.long}
				latitude={filmContaminationInfo.lat}
				anchor="top-left"
				key={filmContaminationInfo.id}
			>
				<Icon iconName="film-contamination" style={{ color: '#FF9315' }} />
			</Marker>
		),
		[],
	);

	const portsToMarkers = useCallback(
		({ port, coordinates }: { port: string; coordinates: number[] }) => (
			<Marker
				onClick={() => setPopup(
					<PortPopup coordinates={coordinates} name={port} onClose={() => setPopup(null)} />,
				)}
				longitude={coordinates[0]}
				latitude={coordinates[1]}
				anchor="top-left"
				key={`${port}${coordinates[0]}${coordinates[1]}`}
			>
				<div
					style={{
						width: 30,
						height: 30,
						borderRadius: '50%',
						backgroundColor: '#00E5FF',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Icon style={{ color: 'black' }} iconName="anchor" />
				</div>
			</Marker>
		),
		[],
	);

	const greenhouseGasesFeatures = useMemo(
		() => greenhouseGases.map(mapGreenhouseGasesDataToFeatures),
		[greenhouseGases],
	);

	const shipMarkers = useMemo(
		() => ships.map(mapShipsDataToMarkers),
		[mapShipsDataToMarkers, ships],
	);

	const portMarkers = useMemo(() => ports.map(portsToMarkers), [ports, portsToMarkers]);

	const filmContaminationMarkers = useMemo(
		() => filmContamination.map(mapFilmContaminationToMarkers),
		[filmContamination, mapFilmContaminationToMarkers],
	);

	const getClickedHeap = useCallback(
		(lng: number, lat: number) => greenhouseGasesFeatures.find((greenhouseGase) => turf.booleanPointInPolygon(
			turf.point([lng, lat]),
			turf.polygon(greenhouseGase.geometry.coordinates),
		)),
		[greenhouseGasesFeatures],
	);

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
			onClick={(e) => {
				const clickedGreenhouseGase = getClickedHeap(e.lngLat.lng, e.lngLat.lat);

				if (clickedGreenhouseGase) {
					setPopup(
						<GreenhouseGasePopup
							date={clickedGreenhouseGase.properties.date}
							coordinates={e.lngLat.toArray()}
							emission={Math.round(clickedGreenhouseGase.properties?.emission)}
							onClose={() => setPopup(null)}
						/>,
					);
				}
			}}
			mapStyle="mapbox://styles/ea-dev/clpn3u19i010801po2evb0nto"
		>
			{popup}
			{portMarkers}
			{slicesAccessibility.FILM_CONTAMINATION && filmContaminationMarkers}
			{slicesAccessibility.SHIPS && shipMarkers}
			{slicesAccessibility.GREENHOUSE_GASES && (
				<Source
					id="my-data"
					type="geojson"
					data={{
						type: 'FeatureCollection',
						features: [...greenhouseGasesFeatures],
					} as any}
				>
					<Layer {...layerStyle} />
				</Source>
			)}
			{slicesAccessibility.GREENHOUSE_GASES && (
				<Box sx={{
					position: 'absolute',
					bottom: 100,
					right: 38,
					zIndex: '1',
					width: 180,
					height: 200,
					backgroundColor: '#0B071B',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					borderRadius: 4,
				}}
				>
					<GasesInfoTable />
				</Box>
			)}

			<NavigationControl
				style={{
					marginTop: 400,
				}}
				position="top-right"
				showCompass={false}
			/>
		</Map>
	);
};

export default DataMap;
