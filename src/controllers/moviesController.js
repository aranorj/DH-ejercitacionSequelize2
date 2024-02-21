const generoService = require('../model/generoService');
const peliculaService = require('../model/peliculaService');
const { CreateResponse } = require('./utils/responses')


let moviesController = {

  list: async function (req, res) {
    try {
      let peliculas = await peliculaService.getAll()
      res.json(peliculas).status(200)
    } catch (error) {
      console.log(error.message);
      res.set('Content-Type', 'text/plain')

      res.set('Access-Control-Allow-Origin', '*');
      res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.set('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      res.set('Access-Control-Allow-Credentials', true);
      res.send("Error inesperado").status(500)
    }
  },
  getOne: async function (req, res) {
    try {
      let pelicula = await peliculaService.getBy(req.params.id);
      res.json(pelicula)
    } catch {
      console.log(error.message);
      res.set('Content-Type', 'text/plain')
      res.send("Error inesperado").status(500)
    }
  },

  create: async function (req, res) {
    try {
      let peliculaNueva = await peliculaService.add(req.body);
      res.status(201).json(new CreateResponse(peliculaNueva.id, `${req.protocol}://${req.get('host')}${req.originalUrl}/${peliculaNueva.id}`))
    } catch (error) {
      res.send(e.message).status(500);
    }
  },

  update: function (req, res) {
    peliculaService.updateBy(req.params.id, req.body)
      .then(() => res.json("Pelicula modificada con exito").status(200))
      .catch((e) => res.json(e).status(500))
  },

  delete: function (req, res) {
    peliculaService.deleteBy(req.params.id)
      .then(() => res.send(`El registro con id ${req.params.id} ha sido eliminado`))
      .catch((error) => {
        console.log(error)
        res.send(error.message).status(500)
      })
  }
}

module.exports = moviesController;