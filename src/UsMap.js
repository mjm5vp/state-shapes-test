import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import us from './us.json';
import './UsMap.css';
import * as stateData from './stateData';
import MapBoxMap from './MapboxMap';

const width = 975;
const height = 975;

const UsMap = () => {
	const [svg, setSvg] = useState();
	const [states, setStates] = useState();
	const [displayedImages, setDisplayedImages] = useState([]);

	const svgRef = useRef();
	const gRef = useRef();
	const statesRef = useRef();

	const path = d3.geoPath();

	useEffect(() => {
		setSvg(d3.select(svgRef.current));
		setStates(d3.select(statesRef.current));

		d3.select(svgRef.current).call(zoom);
	}, []);

	const appendImages = (images) => {
		console.log(images);
		setDisplayedImages(
			images.map((image) => {
				return d3
					.select(gRef.current)
					.append('image')
					.attr('xlink:href', image.url)
					.attr('width', 20)
					.attr('height', 20)
					.attr('x', 650)
					.attr('y', 300)
					.on('click', imageClick);
			})
		);
	};

	const imageClick = () => {
		console.log('image click');
	};

	const reset = () => {
		clearImages();
		states.selectAll('path').transition().style('fill', null);
		svg
			.transition()
			.duration(750)
			.call(
				zoom.transform,
				d3.zoomIdentity,
				d3.zoomTransform(svg.node()).invert([width / 2, height / 2])
			);
	};

	const clearImages = () => {
		displayedImages.forEach((image) => {
			image.remove();
		});
		setDisplayedImages([]);
	};

	const clicked = (event, d) => {
		clearImages();
		appendImages(stateData[d.properties.name]?.images || []);
		const [[x0, y0], [x1, y1]] = path.bounds(d);
		event.stopPropagation();
		states.selectAll('path').transition().style('fill', null);
		d3.select(event.target).transition().style('fill', 'red');
		svg
			.transition()
			.duration(750)
			.call(
				zoom.transform,
				d3.zoomIdentity
					.translate(width / 2, height / 2)
					.scale(
						Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height))
					)
					.translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
				d3.pointer(event, svg.node())
			);
	};

	const zoomed = (event) => {
		const { transform } = event;
		d3.select(gRef.current).attr('transform', transform);
		d3.select(gRef.current).attr('stroke-width', 1 / transform.k);
	};

	const zoom = d3.zoom().scaleExtent([1, 8]).on('zoom', zoomed);

	const renderStates = () => {
		return topojson.feature(us, us.objects.states).features.map((state) => {
			return (
				<path
					cursor="pointer"
					fill="#444"
					d={path(state)}
					onClick={(e) => clicked(e, state)}
				></path>
			);
		});
	};

	return (
		<>
			{/* <MapBoxMap className="fixed" /> */}
			<div onClick={reset}>Reset</div>
			<svg className="map" ref={svgRef} viewBox={`0, 0, ${width}, ${height}`}>
				<g ref={gRef}>
					<g ref={statesRef}>{renderStates()}</g>
					<path
						d={path(topojson.mesh(us, us.objects.states, (a, b) => a !== b))}
						fill="none"
						stroke="white"
						strokeLinejoin="round"
					></path>
				</g>
			</svg>
		</>
	);
};

export default UsMap;
