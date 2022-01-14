import React, { useState } from 'react'

function Accept({ selected, unSelect }) {
	const [shareText, setShareText] = useState("Share");

	let showcasePath = "/?pid=";
	let link = window.location.origin + showcasePath + selected.id;

	let open = () => {
		window.location = link;
	}

	let copy = (target) => {
		navigator.clipboard.writeText(link);

		setShareText("Coppied!");
		target.classList.toggle('active');
		setTimeout(() => {
			setShareText("Share");
			target.classList.toggle('active');
		}, 4000)
	}

	return (
		<div className="accept">
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
					<button onClick={() => open()} className="accept-action">
						<svg xmlns="http://www.w3.org/2000/svg" className="hero-solid" viewBox="0 0 20 20" fill="currentColor">
						<path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
						<path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
						</svg>
						Open
					</button>
					<button onClick={(event) => copy(event.target)} className="accept-action">
						{ shareText === "Share" &&
						<svg xmlns="http://www.w3.org/2000/svg" className="hero-solid" viewBox="0 0 20 20" fill="currentColor">
						<path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
						</svg>
						}
						{shareText}
					</button>
				</div>
			</div>
		</div>
	)
}

function Grid({ playlists, select, loadPlaylists }) {
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
			<button onClick={() => loadPlaylists()} className="load-button accept-action">Load More</button>
		</>
	);
}


function Promote({ playlists, loadPlaylists }) {
	const [selected, setSelected] = useState(null);
	
	let headerIdea = selected != null ? "You have choiced" : "Make world discover your Music!"; 

	let select = (item) => {
		setSelected(item);
	}	

	let unSelect = () => {
		setSelected(null);
	}

	return (
		<div className="promote">
			<div className="promote-wrapper">
				<div className="h-stack gap-20">
					<h1 className="login-xl">{headerIdea}</h1>
				</div>
				{selected === null ?
				<Grid playlists={playlists} select={select} loadPlaylists={loadPlaylists} /> :
				<Accept unSelect={unSelect} selected={selected} />}
			</div>
		</div>
	)
}

export default Promote
