'use strict';

const Sequelize = require("sequelize");
console.log('DB',require("../utils/database"));
const {db} = require("../utils").database;



//Model setup
const Movie = db.define("movie",{
    title: {
        type: Sequelize.STRING
    },
    genre: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    }
});

module.exports = Movie;
