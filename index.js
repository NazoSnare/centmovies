'use strict';

//PACKAGES
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const config = require("config");
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");

//GLOBAL VARIABLES
let port = process.env.PORT || config.get("server.port");
let logger = console.log; //put in a variable because it will be easier to switch everything to log to a file instead of console
let databaseUri = config.get('database.uri');
const db = new Sequelize(databaseUri);

//MODULES
const apiRouter = require('./routes/api');




//MIDDLEWARE
//cors to enable requests from all domains as in a publicly exposed api
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));//body parser allows json to be read by the server
app.use(morgan('short'));//morgan logs every request

//setting up static file server in public folder
app.use(express.static(path.join(__dirname,"/public")));


//db test
db.authenticate()
.then(() => {
  logger("successfully entered");
  logger("API AUTHENTICATES WITH DB");
})
.catch( err => {
logger("DB AUTHENTICATE ERROR",err);
});

//routes
app.use('/api', apiRouter);

app.listen(port, () => {
  logger(`Movies API server runs on htpp://localhost:${port}`);
});
