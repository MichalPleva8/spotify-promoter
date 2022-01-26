import React from 'react'
import { useNavigate } from 'react-router-dom';
import nouser from 'assets/nouser.png';

function Nav({ user }) {
	let navigate = useNavigate();

	let logout = () => {
		navigate("/");
	}

	let share = () => {
		navigator.clipboard.writeText(window.location.href)
			.then(() => console.log("Coppied!"))
			.catch(() => console.warn("Link was not coppied!"));
	}

	return (
		<div className='nav'>
			<div className="nav-wrapper">
				<div onClick={() => logout()} className="profile">
					<button className="logout">
						<img src={user.image ? user.image : nouser} className="profile-pic" alt="" />
					</button>
					<div className="profile-content">
						<span className="profile-text">Playlist promoted by</span>
						<a href="#linkToAuthorsSpotify" className="author-link">{user.username ? user.username : "Unknown"}</a>
					</div>
				</div>

				<button onClick={() => share()} title="Copy link!" className="button-sm accept-primary copy-button">Copy link</button>
			</div>
		</div>
	)
}

export default Nav
