import React from 'react'
import '../App.css';

function Login() {
	let host = `${window.location.origin}/`;
	let authUrl = `http://localhost:5000/auth/login?redirect=${host}`;

	return (
		<div className="fullpage-center">
			<div className="login-wrapper">
				<h1 className="login-xl">Promoter</h1>
				<p className="login-text">Promoter is an web app made to promote your spotify playlist in a beautiful coverflow that your music deserves. Register your playlist by <a href="#">Promote</a>.</p>
				<a className='spotify-button' href={authUrl}>Log in with Spotify</a>
			</div>
		</div>
	)
}

export default Login
