import React from 'react'
import '../App.css';
import dev from '../assets/author.jpg'

function Login() {
	let path = window.location.pathname;
	let host = window.location.origin; // gives http://
	let authUrl = `http://localhost:5000/auth/login?redirect=${host}&path=${path}`;
	// let authUrl = `http://localhost:5000/auth/login`;

	if (process.env.NODE_ENV === 'production') {
		authUrl = window.location.origin + `/auth/login?path=${path}`;
	}

	let header, text;
	if (path === "/promote") {
		header = "Promote your Music!";
		text = <p className="login-text">You have to authorize to share your playlist with the world!</p>;
	} else {
		header = "Promoter";
		text = <p className="login-text">
				 Promoter is an web app made to promote
				 your spotify playlist in a beautiful Coverflow that your music
				 deserves. Register your playlist by <a href={window.location.origin + '/promote'}>Promote</a>.
				</p>
	}


	return (
		<div className="login fullpage-center">
			<div className="login-wrapper">
				<h1 className="login-xl">{header}</h1>
				{text}
				<a className='spotify-button' href={authUrl}>Log in with Spotify</a>
			</div>

			<span className="login-dev">
				<img src={dev} className="login-profile" alt="Profile" />
				<div className="login-dev-content">
					<p>Coded by Michal Pleva</p>
					<a href="https://www.github.com">Github</a>
				</div>
			</span>
		</div>
	)
}

export default Login
