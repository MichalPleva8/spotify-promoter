import React, { useState, useEffect } from 'react';
import { api } from 'App';
import nocover from 'assets/nocover.png';

function Song(props) {
	let duration = new Date(props.data.duration_ms);

	let handleClick = (event, spotifyUri) => {
		fetch(`http://localhost:5000/api/play?token=${props.token}&uri=${spotifyUri}`)
			.then(raw => raw.json())
			.then(json => console.log(json))
			.catch(error => console.error(error));
	}

	return (
		<button onClick={(event) => handleClick(event, props.uri)} className="song">
			<span className='song-id'>{Number(props.index) + 1}</span>
			<img src={props.data.cover ? props.data.cover : nocover} className='song-cover' alt="Cover" />
			<div className="song-data">
				<p className='song-info'>{props.data.name || "No Name"}</p>
				<p className='song-info'>{props.data.artist || "No Artist"}</p>
				<p className='song-info'>{props.data.album || "No Album"}</p>
				<p className='song-info'>{`${duration.getMinutes()}:${duration.getSeconds()}` || "0s"}</p>
			</div>
		</button>
	)
}

function SongsList({ songs }) {
	return (
		songs.map((song, index) => (
			<Song data={song} index={index} key={index} />
		)) 
	);
}

function Dashboard(props) {
	const [songs, setSongs] = useState([]);
	const [playlists, setPlaylists] = useState([]);

	useEffect(() => {
		let limit = 10;
		let offset = 0;

		api.getMySongs(limit, offset)
			.then(result => setSongs(result))
			.catch(error => console.error(error));

		api.getMyPlaylists()
			.then(result => setPlaylists(result))
			.catch(error => console.error(error));
	}, [])

	return (
		<div className="dashboard">
			<div className="dashboard-wrapper">
				{ songs && <SongsList songs={songs} />}
			</div>
		</div>
	);
}

export default Dashboard
