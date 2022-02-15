import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bars } from 'react-loader-spinner';
import { HomeButton } from 'components/index';
import { api } from 'App';

function Grid({ tags }) {
	return (
		<>
			<div className="promote-grid">
			{tags.map((item, index) =>
				(
				<Link to={item.href} className="promote-grid-item" key={index}>
					<img src={item.image} alt="cover" />
				</Link>
				)
			)}
			</div>
		</>
	);
}

function ShowAll() {
	const [tags, setTags] = useState([])

	useEffect(() => {
		api.getAllTags()
		  .then(result => {
			console.log(result);
			setTags(result.reverse());
		  }).catch(error => console.error(error));

	}, [])

	return (
		<div>
			<HomeButton />
				<div className="promote-wrapper">
					<div className="h-stack gap-20">
						<h1 className="login-xl">Promoted Playlists</h1>
					</div>
					{tags.length > 0 ? (
						<Grid tags={tags} />
					) : (
						<div className="flex-center">
							<Bars color="#eee" className="loader" width="100" height="248" ariaLabel="Loading" />
						</div>
					)}
				</div>
		</div>
	)
}

export default ShowAll