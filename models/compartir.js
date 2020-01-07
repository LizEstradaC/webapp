'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CompartirSchema = Schema({
	publication:  { type: Schema.ObjectId, ref:'Publication'},
	compartired: { type: Schema.ObjectId, ref:'User'}
});

module.exports = mongoose.model('Compartir', CompartirSchema);