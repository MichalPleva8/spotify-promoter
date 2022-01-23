import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../App';
import Player from '../services/Player.js';

let player;

function Controls({ isPlaying, setIsPlaying, pagination, setPagination, handlePaginationChange }) {
	let slider = document.querySelector('#slider');
	let slideBy = 310;

	let prevTrack = () => {
		slider.scrollBy({ left: -slideBy, top: 0, behavior: 'smooth' });
		if (pagination > 0) {
			setPagination(pagination - 1)
		}
	}

	let togglePlayback = () => {
		isPlaying ? player.pause() : player.play();
		setIsPlaying(!isPlaying);

		handlePaginationChange();
	}

	let likeTrack = (target) => {
		target.classList.toggle('liked');
	}

	let nextTrack = () => {
		slider.scrollBy({ left: slideBy, top: 0, behavior: 'smooth' });
		if (pagination < 9) {
			setPagination(pagination + 1)
		}
	}

	return (
		<div className="controls">
			<button onClick={() => prevTrack()} className="control-button">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
				<path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
				</svg>
			</button>
			{ isPlaying ?
			<button onClick={() => togglePlayback()} className="control-button">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
				<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
				</svg>
			</button> :
			<button onClick={() => togglePlayback()} className="control-button">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
				<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
				</svg>
			</button>
			}
			<button onClick={(event) => likeTrack(event.target)} className="control-button">
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

function Track({ data, index, setIsPlaying }) {
	player = new Player(document.querySelector('#thePlayer'));
	let cover = data.image;

	window.player = player // Global scope for Player

	return (
		<div className="track">
			<img src={cover} alt="cover" />
		</div>
	);
}

function TracksList({ tracks, setIsPlaying }) {
	return (
		tracks.map((track, index) => (
			<Track key={index} index={index} data={track} setIsPlaying={setIsPlaying} />
		))
	);
}

function Showcase(props) {
	const [tracks, setTracks] = useState(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [pagination, setPagination] = useState(0);
	const [current, setCurrent] = useState({ name: "", artist: null });

	let tracksTotal;

	const { pid } = useParams();

	let handlePaginationChange = () => {
		if (tracks != null && tracks.length > 0) {
			let index = pagination;
			let artists = tracks[index].artists.map(item => {
				return item.name;
			});


			setCurrent({ name: tracks[index].name, artist: artists.join(" & ") })
		}
	}

	useEffect(async () => {

		await api.getPromotedPlaylist(pid)
			.then(result => {
				let tracks = result[0].tracks;
				setTracks(tracks);

				player.setSource(tracks[0].preview);
				player.totalTracks = tracks.length;
				tracksTotal = tracks.length;

				console.log(result);
			}).catch(error => console.error(error));
	}, [])

	useEffect(async () => {
		if (tracks) {
			if (pagination < tracks.length) {
				player.setSource(tracks[pagination].preview);
			}
			player.play();
			setIsPlaying(true);
		}

		handlePaginationChange();
	}, [pagination])


	return (
		<div className="showcase">
			<audio id="thePlayer" src="" hidden></audio>
			<div className="showcase-wrapper">
				<div id="slider" className="tracks-overflow">
					<div className="tracks-list">
						{tracks && <TracksList tracks={tracks} setIsPlaying={setIsPlaying} />}
					</div>
				</div>
				<div className="current">
					<h3 className="current-name">{current.name != "" ? current.name : "Start your Jurney"}</h3>
					<h3 className="current-artist">{current.artist != null ? current.artist : "with click of a play button"}</h3>
				</div>
				<Controls
					isPlaying={isPlaying}
					setIsPlaying={setIsPlaying}
					pagination={pagination}
					setPagination={setPagination}
					handlePaginationChange={handlePaginationChange}
				/>
			</div>
		</div>
	)
}

export default Showcase
