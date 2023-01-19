var colors = require("colors");
var debug = require("debug")("API");

/**
 * Middleware de gestion d'erreur
 * http://expressjs.com/fr/guide/error-handling.html
 * @param {*} err 
 * @param {*} req 
 * @param {*} res 
 */
module.exports = (err, req, res) => {
	const message = err.message || "Erreur 500";
	const status = err.status || 500;
	const error = err.stack;

	debug(colors.red(`Error:${status}`, "|"), colors.yellow(err.stack));

	if (process.env.NODE_ENV === "development") {
		if (req.accepts("text/html") && req.headers.accept !== "*/*" && !req.xhr) {
			return res.status(status).send(`
				<div translate="no">
					<pre><b>Error ${status} : ${message}</b></pre>
					<pre>${err.stack}</pre>
				</div>
			`);
		} else {
			return res.status(status).json({ status, message, error });
		}
	} else {
		return res.status(status).json({ status, message });
	}
};
