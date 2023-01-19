const moment = require("moment");
var colors = require("colors");
var debug = require("debug")("API");

/**
 * Affiche les requêtes dans la console
 */
module.exports = (req, res, next) => {
	const dateTime = moment().format("YYYY/MM/DD HH:mm:ss");
	const startTime = process.hrtime();

	res.on("finish", () => {
		var requestTime = parseFloat(process.hrtime(startTime).join("."));

		if (process.env.NODE_ENV === "development") {
			let requestTimeColor;

			if (requestTime < 1) {
				requestTimeColor = colors.green(requestTime);
			} else if (requestTime > 1 && requestTime < 2) {
				requestTimeColor = colors.yellow(requestTime);
			}
			else if (requestTime > 2) {
				requestTimeColor = colors.red(requestTime);
			}
			else {
				requestTimeColor = colors.white(requestTime);
			}

			debug(colors.white(dateTime), "|", colors.green(req.method), "|", colors.green(req.originalUrl), "|", res.statusCode, "|", requestTimeColor);
		}

	});

	next();
};