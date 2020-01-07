'use strict'

var path = require('path');
var fs = require('fs');
var moment = require('moment');
var mongoosePaginate = require('mongoose-pagination');

var Publication = require('../models/publication');
var User = require('../models/user');
var Follow = require('../models/follow');
var Comment = require('../models/comment');

function saveComment(req, res){
	var params = req.body;

	Publication.findById( req.params.id , function(error, documento){
      if(error){
        return res.status(500).send({message: 'Error al guardar la like'});
      }else{
         var publication = documento;
         
         var comentar = new Comment();
         comentar.text = req.params.comentario;
         comentar.created_at = moment().unix();
         comentar.commented = req.user.sub;
         
         comentar.name = req.user.name;
         comentar.image = req.user.image;
         comentar.nick  = req.user.surname;
         comentar.save();
         
         publication.comment.push(comentar);
         publication.save(function(error, documento){
            if(error){
               return res.status(500).send({message: 'Error al guardar la like'});
            }else{ 
              return res.status(200).send({publication: documento});
            }
         });
      }
   });
}

function deleteComment(req, res){
	var commentId = req.params.id;

	Comment.find({'_id': commentId}).remove(err => {
		if(err) return res.status(500).send({message: 'Error al borrar la publicacion compartida'});
		
		return res.status(200).send({message: 'Publicación compartida eliminada correctamente'});
	});
}

module.exports = {
	saveComment,
	deleteComment
}