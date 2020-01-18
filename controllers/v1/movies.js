'use strict';

const _ = require('lodash');
const Movie = require("../../models/movie");
const {db} =require("../../utils").database;

//pagination items number
const items_per_page = 3;

let logger = console.log;


    /**
     * Route handler for getting all movies
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
let getAllMovies = async(req, res, next) => {
    let moviesa = [
        'The One',
        'Terminator',
        'Top Gun'
    ];

    try {
        let movies = await Movie.findAll();

        if (!movies) {
            //notify admin because there is a breach on malcomAuth middleware or package
            res.json({
                success: false,
                msg: "movies not found"
            });
        } else {
            res.json({
                success: true,
                movies
            });
        }
    } catch (error) {
        res.json({
            success: false,
            msg: "The server could not retrieve the movies check with admin"
        });
    }

};//end of getAllMovies


/**
 * Route handler for adding a movie to the api and database
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
let addMovie = async(req, res, next) => {
   let body = req.body;
   let filteredBody = _.pick(body, ['title', 'genre', 'description']);
   //insert into database
   try {
    let movie = await Movie.create(filteredBody);
    if(movie){
        logger('MOVIE ADDED',movie);
        res.json({
            success: true,
            msg: 'movie added',
            movie
        });
    }else{
        res.json({
            success: false,
            msg: "Movie not added to db"
        });
    }
   } catch (error) {
    logger(error);
    res.json({
        success: false,
        msg: "Movie not added to db due to error, contact admin"
    });
   }
  
   


};





module.exports = {
    getAllMovies,
    addMovie
}