'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LikeSchema = Schema({
	liked: Number
});

module.exports = mongoose.model('Like', LikeSchema);