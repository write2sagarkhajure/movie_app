const router = require('express').Router();
const { searchMovie, addMovie, addMovies } = require('../controllers/movieController');

router.get('/movies', searchMovie);

router.post('/movie', addMovie);

router.post('/movies', addMovies);

module.exports = router;