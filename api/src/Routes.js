// http://expressjs.com/fr/guide/routing.html#express-router
const express = require("express");
const router = express.Router();

// Emplacement des routes de l'API
router.use("/", require("./routes/Home"));

module.exports = { router };
