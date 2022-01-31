import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import nouser from 'assets/nouser.png';

function Nav({ user }) {
	let navigate = useNavigate();
	let copyRef = useRef(null);

	let logout = () => {
		navigate("/");
	}

	return (
		<div className='nav'>
			<div className="nav-wrapper">
				<div className="profile">
					<button onClick={() => logout()} className="home-button">
						<svg xmlns="http://www.w3.org/2000/svg" className="hero-solid" viewBox="0 0 20 20" fill="currentColor">
						<path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
						</svg>
					</button>
					<div className="logout">
						<img src={user.image ? user.image : nouser} className="profile-pic" alt="" />
					</div>
					<div className="profile-content">
						<span className="profile-text">Playlist promoted by</span>
						<a href={user.profileUrl ? user.profileUrl : ""} target="_blank" className="author-link">
							{user.username ? user.username : "Unknown"}
						</a>
					</div>
				</div>

				<Link to="/promote">
					<button className="button-sm accept-primary copy-button">
						Promote your music!
					</button>
				</Link>
			</div>
		</div>
	)
}

export default Nav
