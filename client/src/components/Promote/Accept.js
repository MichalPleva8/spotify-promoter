import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bars } from 'react-loader-spinner';
import { api } from 'App';

function Accept({ me, selected, unSelect }) {
	const [tracks, setTracks] = useState([]);
	const [uploading, setUploading] = useState(false);
	let navigate = useNavigate();

	useEffect(() => {
		if (api.accessToken != "" && tracks.length === 0) {
			let { id, tracks } = selected;

			api.getPlaylistTracks(id, 35, 0)
				.then(result => {setTracks([]); setTracks(result);})
				.catch(error => console.error(error));
		}
	}, [selected]);

	let save = async () => {
		let trackItems = tracks.map((item, index) => {
			return {
				idx: index,
				name: item.name,
				artists: item.artists,
				preview: item.preview_url,
				image: item.album.images[1].url
			}
		}); 

		let payload = {
			id: selected.id,
			name: selected.name,
			author: selected.author,
			image: selected.image,
			created: {
				username: me.username,
				email: me.email,
				image: me.image,
				country: me.country
			},
			tracks: trackItems,
			total: trackItems.length
		}

		api.promotePlaylist(payload)
			.then(result => {
				if (result.error === 'none') {
					navigate(`/showcase/${selected.id}`)
				}
			})
			.catch(error => console.error(error));
			
		setUploading(true);
	}

	return (
		<div className="accept">
			{ !uploading ?
			<div className="accept-wrapper">
				<img src={selected.image} className="accept-image" alt="cover" />
				<div className="group">
					<h2 className="login-lg">{selected.name}</h2>
					<p className="accept-author">by {selected.author}</p>
				</div>

				<div className="accept-group">
					<button onClick={() => unSelect()} className="accept-action">
						<svg xmlns="http://www.w3.org/2000/svg" className="hero-solid" viewBox="0 0 20 20" fill="currentColor">
						<path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
						</svg>
						Change
					</button>
					<button onClick={() => save()} className="accept-action accept-primary">
						<svg xmlns="http://www.w3.org/2000/svg" className="hero-solid" viewBox="0 0 20 20" fill="currentColor">
						<path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
						</svg>
						Promote	
					</button>
				</div>
			</div> :
			<Bars color="#eee" wrapperStyle={{marginLeft: "calc(50% - 100px)", marginTop: "100px"}} width="200" height="200" ariaLabel="Loading" />
			}
		</div>
	)
}

export default Accept