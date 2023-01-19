const helmet = require("helmet");

/**
 * Helmet vous aide à sécuriser vos applications Express
 * http://expressjs.com/fr/advanced/best-practice-security.html#utilisez-helmet
 * https://www.npmjs.com/package/helmet
 * @param {*} app
 */
module.exports = () => {
	return helmet({
		contentSecurityPolicy: true,
		dnsPrefetchControl: true,
		expectCt: true,
		frameguard: true,
		hidePoweredBy: true,
		hsts: true,
		ieNoOpen: true,
		noSniff: true,
		permittedCrossDomainPolicies: true,
		xssFilter: true,
		crossOriginResourcePolicy: { policy: "cross-origin" }
	});
};