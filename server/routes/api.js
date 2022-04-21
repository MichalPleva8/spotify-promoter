const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/me', (req, res, next) => {
	const token = req.headers.key || req.query.token;

	const requestUri = "https://api.spotify.com/v1/me";
	const requestHeaders = {
		"Accept": "application/json",
		"Content-Type": "application/json",
		"Authorization": `Bearer ${token}`
	};

	try {
		request.get(requestUri, { headers: requestHeaders }, (error, response, body) => {
			if (error) throw error;

			let raw = JSON.parse(body)

			let payload = {
				error: 'noresults',
				message: 'No results were found'
			}

			if (raw.display_name) {
				payload = {
					image: raw.images[0].url,
					username: raw.display_name,
					email: raw.email,
					profile_url: raw.external_urls.spotify,
					country: raw.country,
				};
			}

			return res.status(200).json(payload);
		});
	} catch (error) {
		return next(error);
	}

});

// Get list of all songs
router.get('/songs', (req, res, next) => {
	const token = req.headers.key || req.query.token;

	let limit = req.query.limit || 25;
	let offset = req.query.offset || 0;
	let market = req.query.market || 'SK';

	const requestUri = `https://api.spotify.com/v1/me/tracks?market=${market}&limit=${limit}&offset=${offset}`;
	const requestHeaders = {
		"Accept": "application/json",
		"Content-Type": "application/json",
		"Authorization": `Bearer ${token}`,
	};

	try {
		request.get(requestUri, { headers: requestHeaders }, (error, response, body) => {
			if (error) throw error; 
				
			const raw = JSON.parse(body)
			const payload = raw.items.map(item => {
				return {
					cover: item.track.album.images[0].url,
					name: item.track.name,
					artist: item.track.artists[0].name,
					album: item.track.album.name,
					duration_ms: item.track.duration_ms, 
					uri: item.track.uri
				};
			});

			return res.status(200).json(payload);
		});
	} catch (error) {
		return next(error);
	}
});

router.get('/playlists', (req, res) => {
	const token = req.headers.key || req.query.token;

	// Params for request
	let limit = req.query.limit || 15;
	let offset = req.query.offset || 0;

	const requestUri = `https://api.spotify.com/v1/me/playlists?limit=${limit}&offset=${offset}`;
	const requestHeaders = {
		"Accept": "application/json",
		"Content-Type": "application/json",
		"Authorization": `Bearer ${token}`
	};

	try {
		request.get(requestUri, { headers: requestHeaders }, (error, response, body) => {
			if (error) throw error;
				
			const raw = JSON.parse(body)
			
			const payload = raw.map(item => {
				return {
					id: item.id,
					image: item.images[0].url,
					name: item.name,
					author: item.owner.display_name,
					tracks: {
						href: item.tracks.href,
						total: item.tracks.total
					} 
				};
			});

			return res.status(200).json(payload);
		});
	} catch (error) {
		return next(error);
	}
});

router.get('/playlist/tracks', (req, res, next) => {
	const token = req.headers.key || req.query.token;

	// Params for request
	let pid = req.query.pid || "";
	let limit = req.query.limit || 15;
	let offset = req.query.offset || 0;
	
	const requestUri = `https://api.spotify.com/v1/playlists/${pid}/tracks?market=SK&limit=${limit}&offset=${offset}`;
	const requestHeaders = {
		"Accept": "application/json",
		"Content-Type": "application/json",
		"Authorization": `Bearer ${token}`
	};

	try {
		request.get(requestUri, { headers: requestHeaders }, (error, response, body) => {
			if (error) { res.status(400).json({ error: 'Bad request to Spotify Api', message: error }); return; }
				
			let raw = JSON.parse(body)
			
			let payload = []; 
			raw.items.forEach(item => payload.push(item.track));
			// for (let i = 0; i < raw.items.length; i++) {
			// 	payload.push({
			// 		id: raw.items[i].id,
			// 		image: raw.items[i].images[0].url,
			// 		name: raw.items[i].name,
			// 		author: raw.items[i].owner.display_name,
			// 		tracks: {
			// 			href: raw.items[i].tracks.href,
			// 			total: raw.items[i].tracks.total
			// 		} 
			// 	});
			// }

			return res.status(200).json(payload);
		});
	} catch (error) {
		return next(error);
	}
});

// Get current playback 
router.get('/playback', (req, res, next) => {
	const token = req.headers.key || req.query.token;

	const requestUri = "https://api.spotify.com/v1/me/player/currently-playing";
	const requestHeaders = {
		"Accept": "application/json",
		"Content-Type": "application/json",
		"Authorization": `Bearer ${token}`
	};

	try {
		request.post(requestUri, { headers: requestHeaders }, (error, response, body) => {
			if (error) throw error;

			console.log(response.statusCode);

			// let payload = {};
			// if (body.item) {
			// 	payload = {
			// 		timestamp: body.timestamp,
			// 		progress_ms: body.progress_ms,
			// 		album: body.item.album,
			// 		href: body.item.href,
			// 		id: body.item.id,
			// 		images: body.item.images,
			// 		name: body.item.name,
			// 	}
			// }

			return res.status(200).json(body);
		});
	} catch (error) {
		return next(error);
	}
});

// Skip song
router.get('/skip', (req, res, next) => {
	const token = req.headers.key || req.query.token;

	const requestUri = `https://api.spotify.com/v1/me/player/next`;
	const requestHeaders = {
		"Accept": "application/json",
		"Content-Type": "application/json",
		"Authorization": `Bearer ${token}`
	};

	try {
		request.post(requestUri, { headers: requestHeaders }, (error, response, body) => {
			if (error) throw error;

			return res.status(200).json({
				data: {},
				message: 'Skipped!',
			});
		});
	} catch (error) {
		return next(error);
	}
});

// Prev song 
router.get('/prev', (req, res, next) => {
	const token = req.headers.key || req.query.token;

	const requestUri = `https://api.spotify.com/v1/me/player/previous`;
	const requestHeaders = {
		"Accept": "application/json",
		"Content-Type": "application/json",
		"Authorization": `Bearer ${token}`
	};

	try {
		request.post(requestUri, { headers: requestHeaders }, (error, response, body) => {
			if (error) throw error;

			return res.status(200).json({ error: 'none', message: 'Previous!' });
		});
	} catch (error) {
		return next(error);
	}
});

// Change song
router.get('/play', (req, res, next) => {
	let songUri = req.query.uri;

	const requestUri = `https://api.spotify.com/v1/me/player/queue?uri=${songUri}`;
	const requestHeaders = {
		"Accept": "application/json",
		"Content-Type": "application/json",
		"Authorization": `Bearer ${req.query.token}`
	};

	try {
		request.post(requestUri, { headers: requestHeaders }, (error, response, body) => {
			if (error) throw error;
				
			request.post(`https://api.spotify.com/v1/me/player/next`, { headers: requestHeaders }, (error, response, body) => {
				if (error) throw error;

				const payload = { songUri, message: 'Played!' }; 
				return res.status(200).json(payload);
			});
		});
	} catch (error) {
		return next(error);
	}
});


module.exports = router;