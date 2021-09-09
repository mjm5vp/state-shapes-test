import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import UsMap from './UsMap';
import MapBoxMap from './MapboxMap';

const App = () => {
	const [isShown, setIsShown] = useState(true);

	return (
		<div className="app-container">
			<div onClick={() => setIsShown(true)}>Show Map</div>
			<MapBoxMap isShown={isShown} close={() => setIsShown(false)}></MapBoxMap>
			<UsMap className="usmap"></UsMap>
		</div>
	);
};

export default App;
