import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import './MapboxMap.css';

mapboxgl.accessToken =
	'pk.eyJ1IjoibWFya21vZWxsZXJ1dmEiLCJhIjoiY2o0dXFsa2F6MG44eTJ4cGwxZ2hrOHVkbCJ9.oXW5yLvO_PXRxDBCwA5DRQ';

const MapBoxMap = ({ isShown, close }) => {
	useEffect(() => {
		new mapboxgl.Map({
			container: 'map', // container ID
			style: 'mapbox://styles/markmoelleruva/cj5b7btrz17vn2rqx1ldub98b',
			center: [-74.5, 40], // starting position [lng, lat]
			zoom: 9, // starting zoom
			attributionControl: false,
		});
	}, []);

	return (
		<div className={isShown ? 'map-container' : 'map-container none'}>
			<div className="close-button" onClick={close}>
				X
			</div>
			<div className="mapbox-map" id="map"></div>
		</div>
	);
};

export default MapBoxMap;
