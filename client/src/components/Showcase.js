import React, { useState, useEffect } from 'react';
import { api } from '../App';


function Controls() {
	let slider = document.querySelector('#slider');

	let prevTrack = () => {
		slider.scrollBy({ left: -300, top: 0, behavior: 'smooth' });
	}

	let nextTrack = () => {
		slider.scrollBy({ left: 300, top: 0, behavior: 'smooth' });
	}

	return (
		<div className="controls">
			<button onClick={() => prevTrack()} className="control-button">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
				<path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
				</svg>
			</button>
			<button className="control-button">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
				<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
				</svg>
			</button>
			<button className="control-button">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
				<path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
				</svg>
			</button>
			<button onClick={() => nextTrack()} className="control-button">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
				<path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
				</svg>
			</button>
		</div>
	)
}

function Track({ data, index }) {
	let cover = data.track.album.images[1].url;

	return (
		<div className="track">
			<img src={cover} alt="cover" />
		</div>
	);
}

function TracksList({ tracks }) {
	return (
		tracks.map((track, index) => (
			<Track key={index} index={index} data={track} />
		))
	);
}


function Showcase(props) {
	const [tracks, setTracks] = useState(null);

	useEffect(() => {
		api.getPlaylistTracks("37i9dQZF1DX76t638V6CA8", 10, 2)
			.then(result => setTracks(result))
			.catch(error => console.error(error));
	}, [])

	return (
		<div className="showcase">
			<div className="showcase-wrapper">
				<div id="slider" className="tracks-overflow">
					<div className="tracks-list">
						{tracks && <TracksList tracks={tracks} />}
					</div>
				</div>
				<div className="current">
					<h3 className="current-name">Skip</h3>
					<h3 className="current-artist">Arai & Dj Khalid</h3>
				</div>
				<Controls />
			</div>
		</div>
	)
}

export default Showcase
