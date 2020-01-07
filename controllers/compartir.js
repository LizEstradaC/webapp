'use strict'

var path = require('path');
var fs = require('fs');
var moment = require('moment');
var mongoosePaginate = require('mongoose-pagination');

var Publication = require('../models/publication');
var User = require('../models/user');
var Follow = require('../models/follow');
var Compartir = require('../models/compartir');

function saveCompartir(req, res){
	var params = req.body;

	if(!params.publication) return res.status(200).send({message: 'Debes compartir una publicación!!'});

	var compartir = new Compartir();
	compartir.publication = params.publication;
	compartir.compartired = req.user.sub;

	compartir.save((err, compartirStored) => {
		if(err) return res.status(500).send({message: 'Error al guardar la publicación compartida'});

		if(!compartirStored) return res.status(404).send({message: 'La publicación compartida NO ha sido guardada'});

		return res.status(200).send({compartir: compartirStored});
	});

}
function getCompartir(req, res){
	var page = 1;
	if(req.params.page){
		page = req.params.page;
	}

	var itemsPerPage = 4;

	Follow.find({user: req.user.sub}).populate('followed').exec((err, follows) => {
		if(err) return res.status(500).send({message: 'Error devolver el seguimiento'});

		var follows_clean = [];

		follows.forEach((follow) => {
			follows_clean.push(follow.followed);
		});
		follows_clean.push(req.user.sub);

		Compartir.find({user: {"$in": follows_clean}}).sort('-created_at').populate('user').paginate(page, itemsPerPage, (err, publications, total) => {
			if(err) return res.status(500).send({message: 'Error devolver publicaciones'});

			if(!publications) return res.status(404).send({message: 'No hay publicaciones'});

			return res.status(200).send({
				total_items: total,
				pages: Math.ceil(total/itemsPerPage),
				page: page,
				items_per_page: itemsPerPage,
				publications
			});
		});

	});
}

function deleteCompartir(req, res){
	var compartirId = req.params.id;

	Compartir.find({'user': req.user.sub, '_id': compartirId}).remove(err => {
		if(err) return res.status(500).send({message: 'Error al borrar la publicacion compartida'});
		
		return res.status(200).send({message: 'Publicación compartida eliminada correctamente'});
	});
}
module.exports = {
	saveCompartir,
	getCompartir,
	deleteCompartir
}