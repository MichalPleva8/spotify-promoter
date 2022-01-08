const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/me', (req, res) => {
	const requestUri = "https://api.spotify.com/v1/me";
	const requestBody = {};
	const requestHeaders = {
		"Accept": "application/json",
		"Content-Type": "application/json",
		"Authorization": `Bearer ${req.query.token}`
	};

	try {
		request.get(requestUri, { headers: requestHeaders }, (error, response, body) => {
			let raw = JSON.parse(body)
			let payload = {
				image: raw.images[0].url,
				username: raw.display_name,
				email: raw.email,
				country: raw.country,
			};

			res.status(200).json(payload);
		});
	} catch (error) {
		res.status(400).json({ error: 'invalid_token', message: error });
	}

});

// Get list of all songs
router.get('/songs', (req, res) => {
	let limit = req.query.limit || 25;
	let offset = req.query.offset || 0;
	let market = req.query.market || 'SK';

	const requestUri = `https://api.spotify.com/v1/me/tracks?market=${market}&limit=${limit}&offset=${offset}`;
	const requestHeaders = {
		"Accept": "application/json",
		"Content-Type": "application/json",
		"Authorization": `Bearer ${req.query.token}`
	};

	request.get(requestUri, { headers: requestHeaders }, (error, response, body) => {
		if (error) { res.status(400).json({ error }); return; }
			
		let raw = JSON.parse(body)
		let payload = []; 
		
		for (let i = 0; i < raw.items.length; i++) {
			payload.push({
				cover: raw.items[i].track.album.images[0].url,
				name: raw.items[i].track.name,
				artist: raw.items[i].track.artists[0].name,
				album: raw.items[i].track.album.name,
				duration_ms: raw.items[i].track.duration_ms, 
				uri: raw.items[i].track.uri
			});
		}

		res.status(200).json(payload);
	});
});

router.get('/playlists', (req, res) => {
	let limit = req.query.limit || 25;
	let offset = req.query.offset || 0;

	const requestUri = `https://api.spotify.com/v1/me/playlists?limit=${limit}&offset=${offset}`;
	const requestHeaders = {
		"Accept": "application/json",
		"Content-Type": "application/json",
		"Authorization": `Bearer ${req.query.token}`
	};

	request.get(requestUri, { headers: requestHeaders }, (error, response, body) => {
		if (error) { res.status(400).json({ error: 'Bad request to Spotify Api', message: error }); return; }
			
		let raw = JSON.parse(body)
		
		try {
			let payload = []; 
			for (let i = 0; i < raw.items.length; i++) {
				payload.push({
					id: raw.items[i].id,
					image: raw.items[i].images[0].url,
					name: raw.items[i].name,
					author: raw.items[i].owner.display_name,
					tracks: {
						href: raw.items[i].tracks.href,
						total: raw.items[i].tracks.total
					} 
				});
			}

			res.status(200).json(payload);
			
		} catch (error) {
			res.status(400).json(error)
		}
	});
});

// Change song
router.get('/play', (req, res) => {
	let songUri = req.query.uri;

	const requestUri = `https://api.spotify.com/v1/me/player/queue?uri=${songUri}`;
	const requestHeaders = {
		"Accept": "application/json",
		"Content-Type": "application/json",
		"Authorization": `Bearer ${req.query.token}`
	};

	request.post(requestUri, { headers: requestHeaders }, (error, response, body) => {
		if (error) { res.status(400).json({ error }); return;}
			
		request.post(`https://api.spotify.com/v1/me/player/next`, { headers: requestHeaders }, (error, response, body) => {
			if (error) { res.status(400).json({ error }); return;}

			let payload = { songUri, message: 'Played!' }; 
			res.status(200).json(payload);
		});
	});
});

// Skip
router.get('/skip', (req, res) => {
	const requestUri = `https://api.spotify.com/v1/me/player/next`;
	const requestHeaders = {
		"Accept": "application/json",
		"Content-Type": "application/json",
		"Authorization": `Bearer ${req.query.token}`
	};

	request.post(requestUri, { headers: requestHeaders }, (error, response, body) => {
		if (error) { res.status(400).json({ error }); return;}

		res.status(200).json({ error: 'none', message: 'Skipped!' });
	});
});

module.exports = router;