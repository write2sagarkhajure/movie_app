const Movie = require('../models/movie');

const searchMovie = (req, res, next) => {
  const { name } = req.query; 

  Movie.find({ name })
  .then((data) => {
    console.log(data);
    if (data && data.length) {
      res.status(200).json({
        name: data[0]._doc.name,
        year: data[0]._doc.year,
        director: data[0]._doc.director
      });
    } else {
      res.status(404).send('Movie not found');
    }
  }).catch((err) => {
    console.error(err);
    res.send(err.message);
  });  
}

const addMovie = (req, res, next) => {
  const { name, year, director } = req.body;       
  const movie = new Movie({
    name, year, director
  });

  Movie.create(movie)
  .then((data) => {
    console.log(data);
    res.status(201).json(data._doc);
  }).catch((err) => {
    console.error(err);
    res.status(422).json({errorMsg :err.message});
  });             
}

const addMovies = (req, res, next) => {
  Movie.insertMany(req.body)
  .then((data) => {
    console.log(data);
    res.status(201).json({'movies' : data});
  }).catch((err) => {
    console.error(err);
    res.status(422).json({errorMsg :err.message});
  });                  
}

module.exports = { searchMovie, addMovie, addMovies };