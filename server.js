var express = require('express');
var app = express();
var path = require('path');
var passport   = require('passport');
var session    = require('express-session');
const bodyParser = require('body-parser');
var flash = require('connect-flash');


var cors = require("cors");

var indexRouter = require('./server/app/routes/index');
var testAPIRouter = require('./server/app/routes/testapirouter');


//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Use CORS
app.use(cors());


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
var authRoute = require('./server/app/routes/auth.js')(app,passport);

//load passport strategies, pass the models as a parameter to look through when authenticating.
require('./server/app/config/passport/passport.js')(passport, models.User);



/******
 *  ROUTES
 */

//Get our API routes.
app.use("/api", testAPIRouter);



//Main file for react pages.
//SPA
/*app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'client/public/','index.html'));
});*/



//All routes handled through react.

//THIS IS HANDLED THROUGH PUG AND EXPRESS.

//Get our INDEX routes.
app.use('/',indexRouter);

//login route -- testing
/*app.post('/login', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    console.log("post received: %s %s", email, password);
});*/






/****
* END ROUTES
********/




 
//Sync our Database Models
models.sequelize.sync().then(function() { 
    console.log('Nice! Database looks fine')
 
}).catch(function(err) { 
    console.log(err, "Something went wrong with the Database Update!")
 
});
 
 
//Start up server.
app.listen(9000, function(err) { 
    if (!err)
        console.log("Site is live");
    else console.log(err)
 
});