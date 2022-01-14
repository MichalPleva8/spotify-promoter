const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();
const request = require('request');
const app = express();

const checkAccessToken = require('./middlewares/validateToken');

// Middleware
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(checkAccessToken)

// Routing
const apiRouter = require('./routes/api');
const authRouter = require('./routes/auth');
app.use('/api', apiRouter, checkAccessToken);
app.use('/auth', authRouter);

// Load React 
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get('/promote', (req, res) => {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))