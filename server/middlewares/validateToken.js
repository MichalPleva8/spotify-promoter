
module.exports = function checkAccessToken(req, res, next) {
	let logging = false; 

	if (req.path.includes("api")) {
		if (logging) {
			console.log(`-> Path: ${req.path}, Has token: ${req.query.token != undefined || req.headers.key != undefined}`);
		}

		if (req.query.token === undefined && req.headers.key == undefined) {
			return res.status(401).json({
				data: {},
				message: "No Authorization!",
			})
		}
	}

	next();
}
