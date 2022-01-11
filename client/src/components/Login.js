import React from 'react'
import '../App.css';

function Login() {
	let path = window.location.pathname;
	let host = window.location.origin + path;
	let authUrl = `http://localhost:5000/auth/login?redirect=${host}`;

	// let header = path === "/promote" ? "Promote your Music!" : "Promoter";
	// let text = path === "/promote" ? "You have to authorize to share your playlist" : "";

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
		<div className="fullpage-center">
			<div className="login-wrapper">
				<h1 className="login-xl">{header}</h1>
				{text}
				{/* <p className="login-text">
				 Promoter is an web app made to promote
				 your spotify playlist in a beautiful Coverflow that your music
				 deserves. Register your playlist by <a href={window.location.origin + '/promote'}>Promote</a>.
				</p> */}
				<a className='spotify-button' href={authUrl}>Log in with Spotify</a>
			</div>
		</div>
	)
}

export default Login
