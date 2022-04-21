const fs = require('fs');
const express = require('express');

module.exports = function handleError(error, req, res, next) {
	console.error(error.stack);

	const now = new Date().toLocaleString();
	fs.appendFileSync('errorlog.txt', `[${now}] - Server has crashed because: ${error.stack}\n`);

	res.status(500).json({
		data: {},
		message: 'Something went wrong with the server!',
	});

	next();
}