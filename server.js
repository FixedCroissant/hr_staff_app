import express from 'express';

let app = express();

import path from 'path';
import passport from 'passport';
import session from 'express-session';
import bodyParser from 'body-parser';
import flash from 'connect-flash';
import cors from 'cors';
import cookieParser from 'cookie-parser';

//Configuation area.
const PORT = process.env.PORT || 9000;
const NODE_ENV = process.env.NODE_ENV || "production";


//Middleware
//Only used with the /api/users route within the testapirouter.js
//commenting out until better organziation.
//const isLoggedIn = require("./server/app/middleware/isLoggedIn.js");


var indexRouter = require('./server/app/routes/index');
var testAPIRouter = require('./server/app/routes/testapirouter');


//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Use CORS
app.use(cors());

//Use Cookie Parser fro Middlware.
app.use(cookieParser());


//For View Engine
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

// For Passport  and Sessions
app.use(session({ secret: 'everythingisawesome',resave: true, saveUninitialized:true}));
//use flash messages
app.use(flash());
app.use(passport.initialize()); 
// persistent login sessions
app.use(passport.session()); 


//Models
var models = require("./server/app/models");

//Routes, use Passport as a argument into the routes/auth.js file.
require('./server/app/routes/auth.js')(app,passport);

//load passport strategies, pass the models as a parameter to look through when authenticating.
require('./server/app/config/passport/passport.js')(passport, models.User);



/******
 *  ROUTES
 */

//Get our API routes.
//Must be logged in.
app.use("/api", testAPIRouter);



//Main file for react pages.
//SPA
// Serve static assets
// serve static assets from the public folder in project root
app.use(express.static(path.resolve(__dirname, 'client/build')));

// Always return the main index.html, so react-router render the route in the client
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});


//All routes handled through react.

//Get our INDEX routes,
//NECCESSARY TO REGISTER A NEW USER FOR NOW.
//app.use('/',indexRouter);

/****
* END ROUTES
********/


/***
 * MIDDLEWARE
 */

//Add new custom middleware.

//currently only locking down the /api/users route with this, commenting this out until
//better organization.
//app.use(isLoggedIn);






//Add error handling middleware.
//500-Error page.
app.use(function (err, req, res,next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

 /***
  * END MIDDLEWARE
  */






//TUrn off for testing.

 
//Sync our Database Models
models.sequelize.sync().then(function() { 
    //console.log('Nice! Database looks fine')
 
}).catch(function(err) { 
    console.log(err, "Something went wrong with the Database Update!")
});
 
 
//Start up server.
app.listen(9000, function(err) { 
    if (!err)
        //List information about the server.
        console.log("Site is live");
    //else console.log(err)
});
//End turn off for testing.

//Export app for use with JEST Testing.
module.exports = app;



