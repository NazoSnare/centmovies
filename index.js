'use strict';

//PACKAGES
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const config = require("config");
const bodyParser = require("body-parser");

//GLOBAL VARIABLES
let port = process.env.PORT || config.get("server.port");
let log = console.log; //put in a variable because it will be easier to switch everything to log to a file instead of console

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

//routes
app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`Movie API server started on htpp://localhost:${port}`);
});
