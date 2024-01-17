const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');

router.get('/movies', moviesController.list);
//router.get('/movies/new', moviesController.new);
//router.get('/movies/recommended', moviesController.recomended);
router.get('/movies/:id/detail', moviesController.getOne);

router.get('/movies/:id', moviesController.edit);

router.put('/movies/:id', moviesController.update);

//router.delete(/movies/:id', moviesController.delete);

module.exports = router;