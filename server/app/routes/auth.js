var authController = require('../controllers/authcontroller.js');
 
//Remember to pass the parameter (passport) from the server.js file
//so that it is injected here.
module.exports = function(app,passport) 
{
 
    //Get the Register Page
    app.get('/register', authController.register);

    //Show the Login PAge
    app.get('/login', authController.login);

    //Head to Dashboard
    //Call middleware function (below)
   app.get('/dashboard',isLoggedIn, authController.dashboard);

    
   
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

