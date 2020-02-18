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
router.get('/loginUser',(req,res,next)=> {
  //console.log(req.query.email + req.query.password);
//Use passport method -- local-signin
passport.authenticate('local-signin',(err,user,info)=>{ 
     if(err){console.log(err)}
      if(info!=undefined){console.log(info.message); res.send(info.message)}
      else{
        //Login for our user.
        req.logIn(user, err => {
                                  User.findOne({
                                                where: {
                                                  username: user.username,
                                                },
                                      })//Close find user.
                                      
                                      .then(user => {
                                      const token = jwt.sign({ id: user.username }, jwtSecret.secret);
                                                    res.status(200).send({
                                                      auth: true,
                                                      token: token,
                                                      message: 'user found & logged in',
                                                          });
                                      });//Close then, user found.
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

//Get users
router.get('/users',authController.findAllUsers)



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
 router.get('/logout',authController.logout);

 

module.exports = router;