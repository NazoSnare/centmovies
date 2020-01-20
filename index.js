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
let logger = console.log; //put in a variable because it will be easier to switch everything to log to a file instead of console



//MODULES
const {db} = require("./utils").database;
const apiRouter = require('./routes/api');
const Movie = require("./models/movie");




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
setTimeout(()=>{
  db.authenticate()
.then(async() => {
  logger("successfully entered");
  logger("API AUTHENTICATES WITH DB");
  try {
    let createdTable = await Movie.sync();
      logger("TABLE CREATED",createdTable);

  }catch (error) {
    logger("TABLE NOT CREATED",error);
  }
 
})
.catch( err => {
logger("DB AUTHENTICATE ERROR",err);
});
}, 3000);

//routes
app.use('/api', apiRouter);

app.listen(port, () => {
  logger(`Movies API server running on htpp://localhost:${port}`);
});
