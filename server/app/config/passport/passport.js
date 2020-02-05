var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport, user) {
    var User = user;
    var LocalStrategy = require('passport-local').Strategy; 

    //Tell Passport which strategy to use when logging in.
    passport.use('local-signup', new LocalStrategy(
 
        { 
            usernameField: 'email',
 
            passwordField: 'password',
 
            passReqToCallback: true // allows us to pass back the entire request to the callback
 
        }, 
 
 
        function(req, email, password, done) {
            //Hash our password as needed.    
            var generateHash = function(password) { 
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null); 
            };
 
           //Look through our mySQL database through Sequelize.
            User.findOne({
                where: {
                    email: email
                }
            }).then(function(user) 
            {
 
                if (user)
 
                { 
                    return done(null, false, {
                        message: 'That email is already taken'
                    });
 
                } 
                else
 
                {
 
                    var userPassword = generateHash(password);
                    
                    //Data to use when creating a new user.
                    var data =
 
                        {
                            email: email,
 
                            password: userPassword,
 
                            firstname: req.body.firstname,
 
                            lastname: req.body.lastname
 
                        };
 
                    //Create our new user based on information provided above.
                    //See data    
                    User.create(data).then(function(newUser, created) {
 
                        //If not created.
                        if (!newUser) { 
                            console.log("new user did not need to be created");
                            return done(null, false);
 
                        }
                        //If created...
                        if (newUser) { 
                            return done(null, newUser);
 
                        }
 
                    });
 
                }
 
            });
 
        }      
 
    ));


//Serialization
passport.serializeUser(function(user, done) {
                done(null, user.id);
        });

//Deserialize user 
passport.deserializeUser(function(id, done) { 
    //In sequielize, findById was replaced with findByPk
    User.findByPk(id).then(function(user) { 
        if (user) {
 
            done(null, user.get());
 
        } else { 
            done(user.errors, null); 
        } 
    }); 
});    

//end local sign up

//start local sign in or login.
//LOCAL SIGNIN
passport.use('local-signin', new LocalStrategy(
 
    {
 
        // by default, local strategy uses username and password, we will override with email 
        usernameField: 'email',
 
        passwordField: 'password',
 
        passReqToCallback: true // allows us to pass back the entire request to the callback
 
    },
 
 
    function(req, email, password, done) { 
        var User = user;
 
        var isValidPassword = function(userpass, password) { 
            return bCrypt.compareSync(password, userpass); 
        }
        
        User.findOne({
            where: {
                email: email
            }
        }).then(function(user) {
 
            if (!user) {
                
                //testing.
                //console.log("this email does not exist.");

                //return done (null, false, req.flash('loginMessage', 'Email does not exist'));
                
                //Error message.
                return done(null,false,{message:"The EMail does not exist."})

            }
 
            if (!isValidPassword(user.password, password)) 
            { 
                //Double Check
                //console.log("You have a bad password.");                
                return done (null, false, {message:"This password you have provided, its terrible. PSST Check your password."});
            }
 
            //Successful login attempt.
 
            var userinfo = user.get();
            return done(null, userinfo);
 
 
        }).catch(function(err) {
 
            console.log("Error:", err); 
            return done (null, false, req.flash('loginMessage', 'There is an error signing you in the system.')); 
        }); 
    }
 
));
//end local signin
}