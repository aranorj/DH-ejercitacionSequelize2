const peliculaService = require('../model/peliculaService');
const generosService = require('../model/generoService');


let moviesController = {
  list: function (req, res) {
    peliculaService.getAll()
      .then((peliculas) => res.render('moviesList', {
        movies: peliculas
      }))
      .catch((e) => res.send("Error inesperado").status)
  },
  getOne: function (req, res) {
    peliculaService.getBy(req.params.id)
      .then((pelicula) => res.render('moviesDetail',{
        movie: pelicula
      }))
      .catch((e) => res.send(e))
  },
  edit: function (req, res) {
    peliculaService.getBy(req.params.id)
      .then((pelicula) => res.render('editMovie', {
        pelicula: pelicula,
        generos: generos
      }))
      .catch((e) => res.send(e.message))
  },
  update: function (req, res) {
    peliculaService.updateBy(req.params.id, req.body)
      .then(() => res.redirect(`/movies/${req.params.id}/detail`))
      .catch((e) => res.send(e))
  },
  delete: function (req, res) {
    peliculaService.deleteBy(req.params.id)
      .then(() => res.redirect("/movies"))
      .catch((error) => {
        console.log(error)
        res.send(error.message)
      })
  },
  new: async function (req, res) {
    try {
      let genres = await generosService.getAll();
      res.render('createMovie', {genres: genres});
    } catch (error) {
      res.send(error.message);
    }
  },
  create: function (req, res) {
    peliculaService.add(req.body)
      .then(() => {
        res.redirect('/movies');
      })
      .catch(e => {
        res.send(e.message);
      })
  }
}

module.exports = moviesController;