import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import SvgMap from './SvgMap';
import MapBoxMap from './MapboxMap';

const App = () => {
	const [isShown, setIsShown] = useState(true);

	return (
		<div className="app-container">
			<MapBoxMap isShown={isShown} close={() => setIsShown(false)}></MapBoxMap>
			<SvgMap showMap={() => setIsShown(true)} className="usmap"></SvgMap>
		</div>
	);
};

export default App;
