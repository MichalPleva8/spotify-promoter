import React from 'react'
import '../App.css';

function Login() {
	let host = `${window.location.origin}/`;
	let authUrl = `http://localhost:5000/auth/login?redirect=${host}`;

	return (
		<div className="fullpage-center">
			<div className="login-wrapper">
				<a className='spotify-button' href={authUrl}>Authorize with Spotify</a>
			</div>
		</div>
	)
}

export default Login
