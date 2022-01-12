import React, { useState, useEffect } from 'react'

function Accept({ selected, deSelect }) {
	return (
		<div className="accept">
			<div className="accept-wrapper">
				<img src={selected.image} className="accept-image" alt="cover" />
				<div className="group">
					<h2 className="login-lg">{selected.name}</h2>
					<p className="accept-author">by {selected.author}</p>
				</div>

				<div className="accept-group">
					<button onClick={() => deSelect()} className="accept-button">Cancel</button>
					<button className="accept-primary accept-button">Promote</button>
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

	let deSelect = () => {
		setSelected(null);
	}

	return (
		<div className="promote">
			<div className="promote-wrapper">
				<h1 className="login-xl">{headerIdea}</h1>
				{selected === null ?
				<Grid playlists={playlists} select={select} /> : <Accept deSelect={deSelect} selected={selected} />}
			</div>
		</div>
	)
}

export default Promote
