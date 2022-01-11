import React, { useState, useEffect } from 'react'

function Promote({ playlists }) {
	const [selected, setSelected] = useState(null);

	let select = (item, element) => {
		setSelected(item);
	}	

	useEffect(() => {
		if (selected != null) {
			let grid = document.querySelector('.promote-grid').children;

			/*
			1. Disable all of the not selected albums
			2. Accept & show user url for sharing
			*/

			// or

			// Show modal with accept option and than show url for sharing
		}
	}, [selected])

	return (
		<div className="promote">
			<div className="promote-wrapper">
				<h1 className="login-xl">Make world discover your Music!</h1>

				<div className="promote-grid">
				{playlists.map((item, index) =>
					(
					<button onClick={(event) => select(item, event.target)} className="promote-grid-item" key={index}>
						<img src={item.image} alt="cover" />
					</button>
					)
				)}
				</div>
			</div>
		</div>
	)
}

export default Promote
