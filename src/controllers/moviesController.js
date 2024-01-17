const peliculaService = require('../model/peliculaService');


let moviesController = {
    list: function(req, res){
      peliculaService.getAll()
      .then((peliculas)=>res.render('moviesList', {movies: peliculas}))
      .catch((e)=> res.send("Error inesperado").status)
    }
}

module.exports = moviesController;