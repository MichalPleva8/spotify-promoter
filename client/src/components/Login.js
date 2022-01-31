import React from 'react'
import HomeButton from 'components/HomeButton';

function Login() {
	let path = window.location.pathname;
	let host = window.location.origin; // gives http://
	let authUrl = `http://localhost:5000/auth/login?redirect=${host}&path=${path}`;

	if (process.env.NODE_ENV === 'production') {
		authUrl = window.location.origin + `/auth/login?path=${path}`;
	}

	return (
		<div className="login fullpage-center">
			<HomeButton />
			<div className="login-wrapper">
				<div className="login-content">
					<h1 className="login-xl">Promote your Music!</h1>
					<p className="login-text">You have to authorize to share your playlist with the world!</p>
				</div>
				<a className='spotify-button' href={authUrl}>Log in with Spotify</a>
			</div>
		</div>
	)
}

export default Login
