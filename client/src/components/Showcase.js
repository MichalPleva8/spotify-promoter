import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Bars } from 'react-loader-spinner';
import { Nav } from 'components/index';
import { api } from 'App';
import Player from 'services/Player.js';

let player;

function Controls({ isPlaying, setIsPlaying, pagination, setPagination, handlePaginationChange, totalTracks }) {
	let handleVolume = (event) => {
		let decimal = Number(event.target.value);
		player.setVolume(decimal);
	}

	let prevTrack = () => {
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
		if (pagination < totalTracks - 1) {
			setPagination(pagination + 1)
		}
	}

	return (
		<div className="controls">
			<div className="volume">
				<svg xmlns="http://www.w3.org/2000/svg" className="hero-solid" viewBox="0 0 20 20" fill="currentColor">
				<path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
				</svg>

				<input type="range" min="0" step="0.01" max="1.0"  onChange={(event) => handleVolume(event)} />

				<svg xmlns="http://www.w3.org/2000/svg" className="hero-solid" viewBox="0 0 20 20" fill="currentColor">
				<path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
				</svg>
			</div>
			<div className="controls-group">
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
		</div>
	)
}

function Track({ data, setPagination, index, pagination }) {
	player = new Player(document.querySelector('#thePlayer'));
	let cover = data.image;

	window.player = player // Global scope for Player

	return (
		<div className="track" onClick={() => setPagination(index)}>
			<img src={cover} alt="cover" />
			{/* {pagination === index &&
			<div className="bar">
				<div className="fill" style={{width: `${time}%`}}></div>
			</div>} */}
		</div>
	);
}

function TracksList({ tracks, setPagination, pagination }) {
	return (
		tracks.map((track, index) => (
			<Track key={index} data={track} index={index} setPagination={setPagination} pagination={pagination} />
		))
	);
}

function Showcase(props) {
	const [tracks, setTracks] = useState([]);
	const [isPlaying, setIsPlaying] = useState(false);
	const [pagination, setPagination] = useState(0);
	const [current, setCurrent] = useState({ name: "", artist: null });
	const [created, setCreated] = useState({ username: "", image: "", link: "" });
	const [totalTracks, setTotalTracks] = useState(1);

	const { pid } = useParams();

	let handlePaginationChange = () => {
		if (tracks.length > 0) {
			let index = pagination;
			let artists = tracks[index].artists.map(item => {
				return item.name;
			});

			let sliderItems = document.querySelectorAll('.track');
			sliderItems[pagination].scrollIntoView({behavior: "smooth", block: "start", inline: "center"})

			setCurrent({ name: tracks[index].name, artist: artists.join(" & ") })
		}
	}

	// Get tracks
	useEffect(async () => {
		await api.getPromotedPlaylist(pid)
			.then(result => {
				setCreated({ username: result[0].created.username, image: result[0].created.image, profileUrl: result[0].created.profile_url });
				setTracks(result[0].tracks);
				setTotalTracks(result[0].total);
			}).catch(error => console.error(error));
	}, [])

	useEffect(() => {
		if (tracks.length > 0) {
			player.setSource(tracks[0].preview);
			player.totalTracks = tracks.length;
		}
	}, [tracks])

	// Change song
	useEffect(async () => {
		if (tracks.length > 0) {
			if (pagination < tracks.length) {
				player.setSource(tracks[pagination].preview);
			}
			player.play();
			setIsPlaying(true);
		}

		handlePaginationChange();
	}, [pagination])


	return (
		<>
		<Nav user={{ username: created.username, image: created.image, profileUrl: created.profileUrl }} />
		<div className="showcase">
			<audio id="thePlayer" src="" hidden></audio>
			<div className="showcase-wrapper">
				<div id="slider" className="tracks-overflow">
					<div className="tracks-list">
						{tracks.length > 0 ?
						<TracksList tracks={tracks} setPagination={setPagination} pagination={pagination} /> :
						<Bars color="#eee" wrapperStyle={{marginLeft: 100}} width="100" height="300" ariaLabel="Loading" />}
					 </div>
				</div>
				<div className="current">
					<h3 className="current-name">{current.name != "" ? current.name : "Start your Jurney"}</h3>
					<h3 className="current-artist">{current.artist != null ? current.artist : "with click of a button"}</h3>
				</div>
				<Controls
					isPlaying={isPlaying}
					setIsPlaying={setIsPlaying}
					pagination={pagination}
					setPagination={setPagination}
					handlePaginationChange={handlePaginationChange}
					totalTracks={totalTracks}
				/>
			</div>
		</div>
		</>
	)
}

export default Showcase
