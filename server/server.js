const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const app = express();

const checkAccessToken = require('./middlewares/validateToken');
const handleError = require('./middlewares/handleError');

dotenv.config();

// Middleware
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));
app.use(morgan('dev'));
app.use(checkAccessToken);

// Routing
const apiRouter = require('./routes/api');
const authRouter = require('./routes/auth');
const processRouter = require('./routes/process');

app.use('/api', apiRouter, checkAccessToken);
app.use('/auth', authRouter);
app.use('/process', processRouter);

// Handle 500 (Internal Error)
app.use(handleError);

// Load React 
app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))