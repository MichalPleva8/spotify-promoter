module.exports = function checkAccessToken(req, res, next) {
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
