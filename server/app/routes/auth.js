var authController = require('../controllers/authcontroller.js');
 
//Remember to pass the parameter (passport) from the server.js file
//so that it is injected here.
module.exports = function(app,passport) 
{
   
    //Login -- only api is accessible through react. 
    app.post('/login', passport.authenticate('local-signin', {
        successRedirect: '/dashboard', 
        failureRedirect: '/login',
        failureFlash : true
        })
    );

    //Post Route on Registration
    app.post('/register', passport.authenticate('local-signup', {
        successRedirect: '/dashboard', 
        failureRedirect: '/register'
    }));
    
    
    //Protect our dashboard route, and go to login page.
    //NEED TO USE WITH REACT AS WELL.
    function isLoggedIn(req, res, next) { 
        if (req.isAuthenticated())
         
            return next();             
        res.redirect('/login');     
    } 
    
    
 
}

