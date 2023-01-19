// Création des variables d'environnement
require("dotenv").config();
process.env.NODE_ENV === "development" ? "development" : "production";
process.env.PORT = process.env.PORT || 3080;
// Chargement de Express.js
const express = require("express");
const app = express();

// Chargement des middlewares
const appMiddleware = require("./middlewares/AppMiddleware");
const handleError = require("./middlewares/modules/ErrorMiddleware");
app.use(appMiddleware);

// Chargement des routes de l'api
const routes = require("./Routes");
app.use(routes.router);

// Renvoie une 404
app.use((req, res) => {
	if (!req.accepts("html")) {
		return res.status(404).json({ message: "Not Found" });
	}
	return res.sendStatus(404);
});

// Chargement du middleware de gestion d'erreurs
app.use((err, req, res, next) => {
	handleError(err, req, res, next);
});

// Attribution des variables d'environnement
app.set("env", process.env.NODE_ENV);
app.set("port", process.env.PORT);

// Ecoute les connexions sur l'hôte et le port spécifié
// http://expressjs.com/fr/api.html#app.listen
app.listen(app.get("port"), () => {
	console.log(`API start | ${app.get("env")} | http://localhost:${app.get("port")}`);
});
