import React from 'react'
import nouser from '../assets/nouser.png';

function Nav({ user, logout }) {
	return (
		<div className='nav'>
			<div className="nav-wrapper">
				<div onClick={() => logout()} className="profile">
					<button className="logout">
						<img src={user.image ? user.image : nouser} className="profile-pic" alt="" />
					</button>
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
