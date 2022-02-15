const express = require('express');
const dotenv = require('dotenv').config();
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
	try {
		if (req.query.redirect != '') {
			redirectTo = req.query.redirect + req.query.path;
		}

		if (process.env.NODE_ENV === 'production') {
			credentials.redirect_uri = 'https://spotify-promoter.herokuapp.com/auth/callback/';
			redirectTo = req.query.path;
		} 

		let authParams = new URLSearchParams({
			response_type: 'code',
			client_id: credentials.client_id,
			// scope: 'user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-private user-read-email user-follow-modify user-follow-read user-library-modify user-library-read streaming app-remote-control user-read-playback-position user-top-read user-read-recently-played playlist-modify-private playlist-read-collaborative playlist-read-private playlist-modify-public',
			scope: 'user-read-private user-library-read playlist-read-collaborative user-read-email playlist-read-private',
			redirect_uri: credentials.redirect_uri,
			state: generateRandomString(16)
		});

		const authUri = 'https://accounts.spotify.com/authorize/?' + authParams.toString();

		res.redirect(authUri);
	} catch (error) {
		console.log("Auth Error: ", error);
		res.redirect('/?error=devmodeonly');
	}
});

router.get('/callback', (req, res) => {
	try {
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

				console.log(redirectTo);
				res.redirect(`${redirectTo}?token=${body.access_token}&refresh=${body.refresh_token}&expires=${body.expires_in}`);
			} else {
				res.redirect(`${redirectTo}?error=invalid`);
			}
		});
		
	} catch (error) {
		console.log("Auth Error: ", error);
		res.redirect('/?error=devmodeonly')
	}
});

router.get('/refresh', (req, res) => {
	let buffer = (Buffer.from(credentials.client_id + ':' + credentials.client_secret)).toString('base64');

	let requestUrl = 'https://accounts.spotify.com/api/token';
	let requestData = {
		grant_type: 'refresh_token',
		refresh_token: req.headers.refresh
	};
	let requestHeaders = { "Authorization": 'Basic ' + buffer, "Content-Type": "application/x-www-form-urlencoded"};

	try {
		request.post({
			url: requestUrl,
			form: requestData,
			headers: requestHeaders,
			json: true
		}, (error, response, body) => {
			if (!error && response.statusCode === 200) {

				console.log("Token has been refreshed");
				console.log(body);
				res.status(200).json({ token: body.access_token, expires: body.expires_in });
			} else {
				console.error(error);
				res.redirect(`${redirectTo}?error=notrefreshed`);
			}
		});
	} catch (error) {
		res.status(400).json({ error: "norefresh", message: "Refresh crashed while requesting data" })
	}

});

module.exports = router;