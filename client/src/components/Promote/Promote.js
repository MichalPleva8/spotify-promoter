import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Login, Accept } from 'components/index.js';
import { api } from 'App';


function Grid({ playlists, select }) {
	return (
		<>
			<div className="promote-grid">
			{playlists.map((item, index) =>
				(
				<button onClick={() => select(item)} className="promote-grid-item" key={index}>
					<img src={item.image} alt="cover" />
				</button>
				)
			)}
			</div>
			{/* <button onClick={() => loadPlaylists()} className="load-button accept-action">Load More</button> */}
		</>
	);
}


function Promote() {
	const [selected, setSelected] = useState(null);
	const [me, setMe] = useState({});
	const [playlists, setPlaylists] = useState([]);
	const [playlistOffset, setPlaylistsOffset] = useState(0);

	let playlistLimit = 25;

	window.onload = async () => {
		await api.getToken();

		if (api.accessToken != "" && playlists.length === 0) {
			api.getMe()
				.then(result => setMe(result))
				.catch(error => console.error(error));

			api.getMyPlaylists(playlistLimit, playlistOffset)
				.then(result => {setPlaylists(result);})
				.catch(error => console.error(error));
		}
	}
	
	let headerIdea = selected != null ? "You have choiced" : "Make world discover your Music!"; 

	let select = (item) => {
		setSelected(item);
	}	

	let unSelect = () => {
		setSelected(null);
	}

	return (
		<div className="promote">
			{ playlists.length > 0 ? 
				<div className="promote-wrapper">
					<div className="h-stack gap-20">
						<h1 className="login-xl">{headerIdea}</h1>
					</div>
					{selected === null ?
					<Grid playlists={playlists} select={select} /> :
					<Accept unSelect={unSelect} selected={selected} me={me} />}
				</div> :
				<Login />
			}
		</div>
	)
}

export default Promote
