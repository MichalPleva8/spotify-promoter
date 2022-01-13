const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();
const request = require('request');
const app = express();


// Middleware
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(cors());

let checkAccessToken = (req, res, next) => {
	let logging = false; 

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

// Routing
const apiRouter = require('./routes/api');
const authRouter = require('./routes/auth');
app.use('/api', apiRouter, checkAccessToken);
app.use('/auth', authRouter);

// Load React 
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get('/promote', (req, res) => {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))