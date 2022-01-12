const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();
const request = require('request');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 5000;

const credentials = {
	client_id: process.env.CLIENT_ID,
	client_secret: process.env.CLIENT_SECRET,
	redirect_uri: ''
}

app.use(session({ resave: false, secret: process.env.SUPER_SECRET, saveUninitialized: true }));
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(cors());


let checkAccessToken = (req, res, next) => {
	let logging = true; 

	if (req.path.includes("api")) {
		if (logging) {
			console.log(`-> Path: ${req.path}, Has token: ${req.query.token != undefined || req.headers.key != undefined}`);
		}

		if (req.query.token === undefined && req.headers.key == undefined) {
			res.status(401).json({ error: "Access Token not provided", statusCode: 401 })
			return;
		}
	}

	next();
}

app.use(checkAccessToken)


// Generate random string for state
let generateRandomString = (length) => {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

// Serve React file 
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Api 
const apiRouter = require('./routes/api');
app.use('/api', apiRouter, checkAccessToken);

// Authorization
let redirectUri = '';
app.get('/auth/login', (req, res) => {
	if (req.query.redirect != '') {
		redirectUri = req.query.redirect;
	}

	let authParams = new URLSearchParams({
		response_type: 'code',
		client_id: credentials.client_id,
		scope: 'ugc-image-upload user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-private user-read-email user-follow-modify user-follow-read user-library-modify user-library-read streaming app-remote-control user-read-playback-position user-top-read user-read-recently-played playlist-modify-private playlist-read-collaborative playlist-read-private playlist-modify-public',
		redirect_uri: 'http://localhost:5000/auth/callback/',
		state: generateRandomString(16)
	});

	const authUri = 'https://accounts.spotify.com/authorize/?' + authParams.toString();

	res.redirect(authUri);
});

app.get('/auth/callback', (req, res) => {
	let code = req.query.code;
	let buffer = (Buffer.from(credentials.client_id + ':' + credentials.client_secret)).toString('base64');

	let requestUrl = 'https://accounts.spotify.com/api/token';
	let requestData = {
		code,
		redirect_uri: 'http://localhost:5000/auth/callback/',
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
			req.session.accessToken = body.access_token;
			req.session.refreshToken = body.refresh_token;
			req.session.save();

			setTimeout(() => {
				request.get('http://localhost:5000/auth/refresh');
			}, body.expires_in);

			res.redirect(`${redirectUri}?token=${body.access_token}&refresh=${body.refresh_token}`);
		} else {
			res.redirect(`${redirectUri}?error=invalid`);
		}
	});
});

app.get('/auth/refresh', (req, res) => {
	let buffer = (Buffer.from(credentials.client_id + ':' + credentials.client_secret)).toString('base64');

	let requestUrl = 'https://accounts.spotify.com/api/token';
	let requestData = {
		grant_type: 'refresh_token',
		refresh_token: req.session.refreshToken
	};
	let requestHeaders = { "Authorization": 'Basic ' + buffer, "Content-Type": "application/x-www-form-urlencoded"};

	request.post({
		url: requestUrl,
		form: requestData,
		headers: requestHeaders,
		json: true
		}, (error, response, body) => {
			if (!error && response.statusCode === 200) {
				req.session.accessToken = body.access_token;
				req.session.save();

				console.log("Token has been refreshed");
				res.end();
			} else {
				console.error(error);
				res.redirect('/?error=notrefreshed');
			}
		});

});

// Handle default
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))