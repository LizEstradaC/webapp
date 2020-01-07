'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = Schema({
	text: String,
	created_at: String,
	commented:  { type: Schema.ObjectId, ref:'User'},
	name: String,
	nick: String,
	image: String
});

module.exports = mongoose.model('Comment', CommentSchema);