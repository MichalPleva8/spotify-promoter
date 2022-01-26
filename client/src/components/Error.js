import React from 'react';
import { Link } from 'react-router-dom';

function Error() {
	return (
		<div className="error">
			<div className="error-wrapper">
				<h2 className="login-xl">Page not found</h2>
				<p>It looks like we can't find the site you are looking for</p>
				<Link className="accept-action accept-primary" to="/">Home</Link>
			</div>
		</div>
	)
}

export default Error
