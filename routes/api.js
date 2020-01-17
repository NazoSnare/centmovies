const express = require('express');
const router = express.Router();

//load routers
//  const passengersRouter = require('./v1/passengersRoute');
// const loginsRouter = require('./v1/loginsRoute');
const moviesRouter = require('./v1/movies');





 router.use('/v1/movies', moviesRouter);



router.use('/', (req, res, next) => {
    res.json({
        msg: 'Hello from centmovies API',
        success: true
    });
});



module.exports = router;