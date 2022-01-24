import React from 'react'
import { useNavigate } from 'react-router-dom';
import nouser from 'assets/nouser.png';

function Nav({ user }) {
	let navigate = useNavigate();

	let logout = () => {
		navigate("/");
	}

	return (
		<div className='nav'>
			<div className="nav-wrapper">
				<div onClick={() => logout()} className="profile">
					<button className="logout">
						<img src={user.image ? user.image : nouser} className="profile-pic" alt="" />
					</button>
					<div className="profile-content">
						<span className="profile-text">Playlist created by</span>
						<a href="#linkToAuthorsSpotify" className="author-link">{user.username ? user.username : "Unknown"}</a>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Nav
