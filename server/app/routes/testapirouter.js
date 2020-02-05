var express = require("express");
var router = express.Router();
var passport   = require('passport');


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
    //console.log('Sent list of items');
});

//use custom call back.
router.post('/login', function(req, res, next) {
    passport.authenticate('local-signin', function(err, user, info) {
      if (err) { return next(err); }
      //no user found.
      if (!user) { return res.json({error:info.message})}   //the information coming back is in the message key. 
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.redirect('/users/' + user.username);
      });
    })(req, res, next);
  });





 //Logout Route
 router.get('/logout',authController.logout);

module.exports = router;