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
       //could use uuid node package to create unique id and then add id as a field but for simplicity I did not
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
};//end of add movie


let getMovie = async(req, res, next) => {
      let id = req.params.id;

      try {
          let movie = await Movie.findByPk(id);
          if(movie){
            res.json({
                success: true,
                msg: 'movie successfully found',
                movie
            });
          }else{
            res.json({
                success: false,
                msg: 'movie not found',
                movie: null
            });
          }
       
      } catch (error) {
          logger("ERROR GETTING MOVIE BY ID",error);
        res.json({
            success: false,
            msg: 'Error getting the movie'
        });
      }
};//end of get movie


let updateMovie = async(req, res, next) => {
    let id = req.params.id;
    let body = req.body;
    //sanitise the body according before using in db call...but I am using it just as it is
    try {
        const result = await Movie.update(
           body,
            { where: { id } }
          );

          if(result){
            res.json({
                success: true,
                msg: 'movie successfully updated',
                movie: result
            });
          }else{
            res.json({
                success: false,
                msg: 'movie not found'
            });
          }

       
        
    } catch (error) {
        logger("ERROR UPDATING MOVIE BY ID",error);
        res.json({
            success: false,
            msg: 'Error updatingthe movie'
        });
    }
  
};//end of update movie

let deleteMovie = async(req, res, next) => {
    let id = req.params.id;
  try {
      let movie = await Movie.findByPk(id);
      
      if(movie){
         let destroyed = await movie.destroy();
          
          if(destroyed){
            res.json({
                success: true,
                msg: 'movie successfully deleted',
                movie
            });
          }
      }else{
        res.json({
            success: false,
            msg: 'Could not find the movie'
        }); 
      }

   
  } catch (error) {
    logger("ERROR Deleting MOVIE BY ID",error);
    res.json({
        success: false,
        msg: 'Error deleting the movie'
    });
  }
};//end of delete movie





module.exports = {
    getAllMovies,
    addMovie,
    getMovie,
    updateMovie,
    deleteMovie
}