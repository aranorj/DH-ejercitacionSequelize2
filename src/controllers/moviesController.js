const generoService = require('../model/generoService');
const peliculaService = require('../model/peliculaService');
const {CreateResponse} = require('./utils/responses')


let moviesController = {

  list: async function (req, res) {
    try {
      let peliculas = await peliculaService.getAll()
      res.json(peliculas).status(200)
    } catch (error) {
      console.log(error.message);
      res.set('Content-Type', 'text/plain')
      res.send("Error inesperado").status(500)
    }
  },
  getOne: function (req, res) {
    peliculaService.getBy(req.params.id)
      .then((pelicula) => res.render('moviesDetail', {
        movie: pelicula
      }))
      .catch((e) => res.send(e))
  },
  edit: function (req, res) {
    generoService.getAll()
    .then(generos => {
      peliculaService.getBy(req.params.id)
        .then((pelicula) => res.render('editMovie', {
          pelicula: pelicula,
          genres: generos
        }))
        .catch((e) => res.send(e.message))
    })
    .catch(e => {
      res.send(e);
    })

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
      let genres = await generoService.getAll();
      res.render('createMovie', {genres: genres});
    } catch (error) {
      res.send(error.message);
    }
  },
  create: async function (req, res) {
    try {
      let peliculaNueva = await peliculaService.add(req.body);
      res.status(201).json(new CreateResponse(peliculaNueva.id, `${req.protocol}://${req.get('host')}${req.originalUrl}/${peliculaNueva.id}`))
    } catch (error) {
      res.send(e.message).status(500);
    } 
  }
}

module.exports = moviesController;