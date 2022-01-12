import React, { useState } from 'react'

function Accept({ selected }) {
	let showcasePath = "/?pid="
	let link = window.location.origin + showcasePath + selected.id;

	let open = () => {
		window.location = link;
	}

	let copy = () => {
		navigator.clipboard.writeText(link);
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
					<button onClick={() => open()} className="accept-action">
						<svg xmlns="http://www.w3.org/2000/svg" className="hero-solid" viewBox="0 0 20 20" fill="currentColor">
						<path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
						<path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
						</svg>
						Open
					</button>
					<button onClick={() => copy()} className="accept-action">
						<svg xmlns="http://www.w3.org/2000/svg" className="hero-solid" viewBox="0 0 20 20" fill="currentColor">
						<path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
						</svg>
						Share
					</button>
				</div>
			</div>
		</div>
	)
}

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
		</>
	);
}


function Promote({ playlists }) {
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
					{selected != null && <button onClick={() => unSelect()} className="accept-unselect">
						<svg xmlns="http://www.w3.org/2000/svg" className="hero-stroke" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
						</svg>
					</button>}
					<h1 className="login-xl">{headerIdea}</h1>
				</div>
				{selected === null ?
				<Grid playlists={playlists} select={select} /> : <Accept unSelect={unSelect} selected={selected} />}
			</div>
		</div>
	)
}

export default Promote
