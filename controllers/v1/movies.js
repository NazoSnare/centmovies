'use strict';

const _ = require('lodash');

//pagination items number
const items_per_page = 3;

let logger = console.log;



let getAllMovies = async(req, res, next) => {
    let movies = [
        'The One',
        'Terminator',
        'Top Gun'
    ];

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
}


module.exports = {
    getAllMovies
}