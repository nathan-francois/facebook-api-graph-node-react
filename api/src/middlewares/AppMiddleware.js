const compression = require("compression");
const express = require("express");
const app = express();
const helmetMiddleware = require("./modules/HelmetMiddleware");
const corsMiddleware = require("./modules/CorsMiddleware");
const logsMiddleware = require("./modules/LogsMiddleware");

// App Engine met fin aux connexions HTTPS au niveau de l'équilibreur de charge et transfère les requêtes à votre application.
// Certaines applications doivent déterminer l'adresse IP et le protocole de la requête d'origine.
// L'adresse IP de l'utilisateur est disponible dans l'en - tête standard X-Forwarded-For.Les applications nécessitant
// ces informations doivent configurer leur framework Web pour qu'il fasse confiance au proxy.
app.set("trust proxy", true);

// Analyse les demandes entrantes avec des charges utiles en JSON
// http://expressjs.com/fr/api.html#express.json
app.use(express.json({ limit: "15MB" }));

// Analyse le corps de la requête
// http://expressjs.com/fr/api.html#express.urlencoded
app.use(express.urlencoded({ extended: true }));

// Chargement de Helmet
app.use(helmetMiddleware());

// Chargement de CORS
app.use(corsMiddleware());

// Le middleware tentera de compresser le corps de réponse
// http://expressjs.com/en/resources/middleware/compression.html
app.use(compression());

// Middleware de logs de requète
app.use((req, res, next) => {
	logsMiddleware(req, res, next);
});

module.exports = app;
