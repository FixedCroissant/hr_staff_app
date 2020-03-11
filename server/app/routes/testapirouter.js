var express = require("express");
var router = express.Router();
var passport   = require('passport');

var jwtSecret =  require('../config/jwtConfig');
var jwt = require('jsonwebtoken');

//Get models.
var models = require("../models");
//Get user
var User = models.User;
var authController = require('../controllers/authcontroller.js');


//under /api/ prefix.
router.get("/", function(req, res, next) {
    res.send("API is working properly");
});

//getList
router.get("/getList", function(req, res, next) {

    var list = ["item1", "item2", "item3"];

    //Return information to JSON.
    res.json(list);
});




/***
 * LOGIN USING JWT ADJUSTMENTS. 
 * IN CONJUNCTION WITH PASSPORTLOGIN TO CHECK OUT USER
 */
router.post('/loginUser',(req,res,next)=> {
  //console.log(req.query.email + req.query.password);
//Use passport method -- local-signin
passport.authenticate('local-signin',(err,user,info)=>{ 
     if(err){console.log(err)}
      //This is sending the message back, if its a bad password, or if the email address doesn't exist, etc.
      //TODO - Fix to show the front end properly.
      if(info!=undefined){console.log(info.message); res.json({auth:false, message:info.message})}
      else{
        //Login for our user.
        req.logIn(user, err => {
          
            //Check for any errors.
            if (err) { console.log('There was an error logging the person in through JWT, see error'.err) }
            else{

                                //See if our user exists within the database.
                                  User.findOne({
                                                where: {
                                                  username: user.username,
                                                },
                                      })//Close find user.
                                      
                                      .then(user => {
                                      const token = jwt.sign({ id: user.username }, jwtSecret.secret);

                                                    //Set Cookie.
                                                    
                                                    //COOKIE PARSER
                                                    //Set JWT
                                                    res.cookie('jwt',
                                                          token,
                                                           {
                                                              maxAge:3600*1000,              //1 hour expiration
                                                              //maxAge:86400*1000,          //24 hour expiration.
                                                              httpOnly:true                 //Not accessible to front end.
                                                            });

                                                    //Set second cookie that will be accessible to the client.
                                                    res.cookie('logged_in',true,{
                                                            maxAge:3600*1000
                                                          }
                                                          );
                                                    //End Second cookie.        

                                                    //Send Success Status.
                                                    res.status(200).json({auth:true, message:'user found & logged in!'})
                                              

                                                    //Good for debugging and doublecehcking.            
                                                    /*res.status(200).send({
                                                      auth: true,
                                                      token: token,
                                                      message: 'user found & logged in',
                                                          });*/

                                    });//Close then, user found.
                                      
                  }

          })//close req.Login        
        }//close else
      })(req, res, next);
    });
 /**
  * END LOGIN USING JWT ADJUSTMENTS
  */

/**CHECK PROTECTED ROUTE */


//test protecting certain routes.
router.get('/test', passport.authenticate('jwt', { session: false }),
    function(req, res) {
        //console.log(res)
        //If successful, send a request that is okay.
        //res.send(req.user.profile);
        res.send({success:"true"});
    }
);


//Get List of our users.
//Example...
//app.get('/api/customers', authController.findAll);
//End example.


const isLoggedIn = require('../middleware/isLoggedIn.js');




//Get users
router.get('/users',isLoggedIn,authController.findAllUsers);
//Get Specific user.
router.get('/user/:id',authController.findUser);

//HR REQUEST AREA
//STORE new HR REQUEST
router.post('/hr/store',authController.hrStoreRequest);
//INDEX all HR REQUESTS
router.get('/hr/index',authController.hrIndexRequest);
//GET A Specific request.
router.get('/hr/:id',authController.hrShowRequest);
//UPDATE A specific request
router.put('/hr/:id',authController.HRUpdateRequest);


//END HR REQUEST AREA



//use custom call back.
router.post('/login', function(req, res, next) {
    passport.authenticate('local-signin', function(err, user, info) {
      if (err) { return next(err); }
      //no user found.
      if (!user) { return res.json({error:info.message})}   //the information coming back is in the message key. 
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        //Succcessful, let react know that using our loggedIn key.
        return res.json({loggedIn:true});
      });
    })(req, res, next);
  });


 //Logout Route
 //TODO -- REMEMBER TO REMOVE SESSION COOKIES!
 router.get('/logout',authController.logout);

 

module.exports = router;