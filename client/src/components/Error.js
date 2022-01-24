import React from 'react';
import { Link, useParams } from 'react-router-dom';

function Error() {
	const { pid } = useParams()

	let headerText = pid === "" ? "No Playlist id" : "Wrong Playlist id"

	return (
		<div className="error">
			<div className="error-wrapper">
				<h2 className="login-xl">{headerText}</h2>
				<Link className="error-link" to="/">Go back</Link>
			</div>
		</div>
	)
}

export default Error
