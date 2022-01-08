import React from 'react'
import cover from '../assets/album.jpg';
import nouser from '../assets/nouser.png';
import { api } from '../App';

function Nav(props) {
	console.log(api.accessToken);

	let next = () => {
		fetch(`http://localhost:5000/api/skip?token=${props.token}`)
			.then(raw => raw.json())
			.then(json => console.log(json))
			.catch(error => console.error(error));
	}

	let pause = () => {
		api.pauseSongs();
	}

	let prev = () => {

	}

	return (
		<div className='nav'>
			<div className="nav-wrapper">
				<div className="nav-data">
					<div className="playback">
						<img src={cover} style={{height: '100px'}} alt="Album" />
						<div className="playback-data">
							<h3>Skip</h3>
							<p>ARAI</p>
							<div className="controls-group">
								<button onClick={() => prev()}>
									<svg xmlns="http://www.w3.org/2000/svg" className="hero-solid" viewBox="0 0 20 20" fill="currentColor">
									<path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
									</svg>
								</button>
								<button onClick={() => pause()}>
									<svg xmlns="http://www.w3.org/2000/svg" className="hero-solid" viewBox="0 0 20 20" fill="currentColor">
									<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
									</svg>
								</button>
								<button onClick={() => next()}>
									<svg xmlns="http://www.w3.org/2000/svg" className="hero-solid" viewBox="0 0 20 20" fill="currentColor">
									<path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
									</svg>
								</button>

							</div>
						</div>
					</div>
				</div>
				<div className="nav-data">
					<div className="profile">
						<img src={props.user.image ? props.user.image : nouser} className='profile-pic'alt="User profile" />
						<div className="profile-data">
							<h4>{ props.user.username ? props.user.username : "No user" }</h4>
							<p>{ props.user.email ? props.user.email : "no@mail.com"}</p>
						</div>
						{props.user.username && <button onClick={() => props.logout()}>Logout</button>}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Nav
