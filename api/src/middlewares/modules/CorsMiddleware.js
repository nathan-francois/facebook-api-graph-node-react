const cors = require("cors");

/**
 * Ajoute les en-tête CORS de response si l'entête est présente dans la request
 * et correspond a un domaine de la whiteList
 * https://expressjs.com/en/resources/middleware/cors.html#configuration-options
 * https://www.npmjs.com/package/cors
 * @param {object} app
 */
module.exports = () => {
	const whiteList = process.env.URL_WHITE_LIST.split(",");

	return cors(function (req, callback) {
		var corsOptions;

		if (whiteList.indexOf(req.header("Origin")) !== -1) {
			corsOptions = {
				origin: true,
				credentials: true,
			};
		} else {
			corsOptions = { origin: false };
		}
		callback(null, corsOptions);
	});
};
