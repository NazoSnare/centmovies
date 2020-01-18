'use strict';

const express = require('express');
const router = express.Router();
let moviesController = require('../../controllers/v1/movies');

router.get('/', (req, res, next) => {
   moviesController.getAllMovies(req, res, next);
});

router.post('/', (req, res, next) => {
   moviesController.addMovie(req, res, next);
});

// router.get('/:id', (req, res, next) => {
//  moviesController.getMovie(req, res,next);
// });



module.exports = router;