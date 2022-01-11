import React from 'react'
import nouser from '../assets/nouser.png';
import './nav.css';

function Nav({ user, logout }) {
	return (
		<div className='nav'>
			<div className="nav-wrapper">
				<div className="profile">
					<img src={user.image ? user.image : nouser} onClick={() => logout()} className="profile-pic" alt="" />
					<div className="profile-content">
						<span className="profile-text">Playlist created by</span>
						<a href="#linkToAuthorsSpotify" className="author-link">{user.username}</a>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Nav
