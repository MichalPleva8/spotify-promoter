import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bars } from 'react-loader-spinner';
import { api } from 'App';
import dev from 'assets/author.jpg';

function TrendingList({ recents }) {
	return (
		recents.map((item, index) => {
			return (
				<Link key={index} to={item.href} className="trending-item">
					<img src={item.image} className="trending-item-image" alt="Playlist Cover" />
					<div className="trending-content">
						<span>{item.name}</span>
						<p>{item.username}</p>
					</div>
				</Link>
			)
		})
	)
}

function Home() {
	const [random, setRandom] = useState("");
	const [recents, setRecents] = useState([]);

	useEffect(async () => {

		await api.getAllTags()
			.then(result => {
				console.log(result);
				let index = Math.floor(Math.random() * result.length);
				let only = result.slice((result.length - 3), result.length);

				setRecents(only);
				setRandom(result[index].href)
			 })
			.catch(error => {
				console.error(error);
				setRandom("/showcase/0ZjgbF5FSJW3K9eQ7wpYvb");
			});
	}, []);

	return (
		<div className="login fullpage-center">
			<div className="login-wrapper">
				<h1 className="login-xl">Spotify Promoter</h1>

				<div className="home-group">
					<div className="trending">
						<div className="trending-wrapper">
							<h1 className="login-md">Recents &#128293;</h1>
							<div className="trending-list">
								{recents.length > 0 ? 
									<TrendingList recents={recents} /> :
									<Bars color="#eee" wrapperStyle={{marginLeft: 100}} width="100" height="248" ariaLabel="Loading" />
								}
							</div>
						</div>
					</div>

					<div className="home-group-primary">
						<Link to="/promote" className="button button-primary super-button">
							<svg xmlns="http://www.w3.org/2000/svg" className="hero-solid" viewBox="0 0 20 20" fill="currentColor">
							<path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
							</svg>
							Promote
						</Link>
						<Link to={random} className="button super-button button-secondary">
							<svg xmlns="http://www.w3.org/2000/svg" className="hero-solid" viewBox="0 0 20 20" fill="currentColor">
							<path fillRule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z" clipRule="evenodd" />
							</svg>
							Try Luck	
						</Link>
					</div>
				</div>
			</div>

			<span className="login-dev">
				<img src={dev} className="login-profile" alt="Profile" />
				<div className="login-dev-content">
					<p>Coded by Michal Pleva</p>
					<a href="https://www.github.com/MichalPleva8" target="_blank">Github</a>
				</div>
			</span>
		</div>
	)
}

export default Home
