'use strict';
//PACKAGES
const config = require("config");
const Sequelize = require("sequelize");

//Global variables
let databaseUri = config.get('database.uri');
const db = new Sequelize(databaseUri);



module.exports = {
    db
}