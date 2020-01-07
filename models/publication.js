'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PublicationSchema = Schema({
	text: String,
	file: String,
	liked: Number,
	created_at: String,
	comment:  [ { type:Schema.ObjectId, ref: 'Comment' } ],
	compartir: { type:Schema.ObjectId, ref: 'User'} ,
	user:{ type:Schema.ObjectId, ref: 'User'},
});

module.exports = mongoose.model('Publication', PublicationSchema);