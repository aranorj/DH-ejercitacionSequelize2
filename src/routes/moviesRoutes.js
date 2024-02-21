const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');

// Listado de peliculas
router.get('/movies', moviesController.list);
router.get('/movies/:id', moviesController.getOne);
router.post('/movies', moviesController.create);
router.patch('/movies/:id', moviesController.update);
router.delete('/movies/:id', moviesController.delete);

module.exports = router;