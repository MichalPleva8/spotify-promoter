const express = require('express');
const router = express.Router();
const request = require('request');

// Spotify credentials
const credentials = {
	client_id: process.env.CLIENT_ID,
	client_secret: process.env.CLIENT_SECRET,
	redirect_uri: 'http://localhost:5000/auth/callback/'
}

// Generate random string for state
let generateRandomString = (length) => {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

let redirectTo = '';
let redirectPath = '';
router.get('/login', (req, res) => {
	if (req.query.redirect != '') {
		redirectTo = req.query.redirect + req.query.path;
	}

	// redirectTo = `${req.protocol}://${req.get('host')}${req.url}`;

	// console.log("Protocol is:", req.protocol);
	// console.log("Path is:", req.url);
	// console.log("Host is:", req.get('host'));
	// console.log("Origin is:", req.get('host'));

	if (process.env.NODE_ENV === 'production') {
		credentials.redirect_uri = 'https://spotify-promoter.herokuapp.com/auth/callback/';
		redirectTo = req.query.path || "/promote";
	} 

	let authParams = new URLSearchParams({
		response_type: 'code',
		client_id: credentials.client_id,
		scope: 'ugc-image-upload user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-private user-read-email user-follow-modify user-follow-read user-library-modify user-library-read streaming app-remote-control user-read-playback-position user-top-read user-read-recently-played playlist-modify-private playlist-read-collaborative playlist-read-private playlist-modify-public',
		redirect_uri: credentials.redirect_uri,
		state: generateRandomString(16)
	});

	const authUri = 'https://accounts.spotify.com/authorize/?' + authParams.toString();

	res.redirect(authUri);
});

router.get('/callback', (req, res) => {
	let code = req.query.code;
	let buffer = (Buffer.from(credentials.client_id + ':' + credentials.client_secret)).toString('base64');

	let requestUrl = 'https://accounts.spotify.com/api/token';
	let requestData = {
		code,
		redirect_uri: credentials.redirect_uri,
		grant_type: 'authorization_code',
		client_id: credentials.client_id,
		client_secret: credentials.client_secret
	};
	let requestHeaders = { "Authorization": 'Basic ' + buffer, "Content-Type": "application/x-www-form-urlencoded"};

	const users = [];

	request.post({
		url: requestUrl,
		form: requestData,
		// headers: requestHeaders,
		json: true
	}, (error, response, body) => {
		if (!error && response.statusCode === 200) {

			setTimeout(() => {
				request.get('http://localhost:5000/auth/refresh');
			}, body.expires_in);

			console.log(redirectTo);
			res.redirect(`${redirectTo}?token=${body.access_token}&refresh=${body.refresh_token}`);
		} else {
			res.redirect(`${redirectTo}?error=invalid`);
		}
	});
});

router.get('/refresh', (req, res) => {
	let buffer = (Buffer.from(credentials.client_id + ':' + credentials.client_secret)).toString('base64');

	let requestUrl = 'https://accounts.spotify.com/api/token';
	let requestData = {
		grant_type: 'refresh_token',
		refresh_token: req.query.refreshToken
	};
	let requestHeaders = { "Authorization": 'Basic ' + buffer, "Content-Type": "application/x-www-form-urlencoded"};

	request.post({
		url: requestUrl,
		form: requestData,
		headers: requestHeaders,
		json: true
		}, (error, response, body) => {
			if (!error && response.statusCode === 200) {

				console.log("Token has been refreshed");
				res.json(body);
			} else {
				console.error(error);
				res.redirect('/?error=notrefreshed');
			}
		});

});

module.exports = router;