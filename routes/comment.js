'use strict'

var express = require('express');
var CommentController = require('../controllers/comment');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/comment/:id/:comentario', md_auth.ensureAuth, CommentController.saveComment);
api.delete('/comment/:id', md_auth.ensureAuth, CommentController.deleteComment);

module.exports = api;