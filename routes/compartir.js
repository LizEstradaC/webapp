'use strict'

var express = require('express');
var CompartirController = require('../controllers/compartir');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/compartir', md_auth.ensureAuth, CompartirController.saveCompartir);
api.get('/compartir/:page?', md_auth.ensureAuth, CompartirController.getCompartir);
api.delete('/compartir/:id', md_auth.ensureAuth, CompartirController.deleteCompartir);

module.exports = api;