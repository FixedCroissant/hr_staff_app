var bcrypt = require('bcrypt');
var jwtSecret = require('../jwtConfig');
const BCRYPT_SALT_ROUNDS = 12;
const JWTSTRATEGY = require('passport-jwt').Strategy,
User = require('../../models/user'),
EXTRACTJWT = require('passport-jwt').ExtractJwt;


module.exports = function(passport, user) {
    var User = user;
    var LocalStrategy = require('passport-local').Strategy; 

//Tell Passport which strategy to use when logging in.
passport.use('local-signup', new LocalStrategy(
 
    { 
        usernameField: 'email',
        passwordField: 'password',
        session: false        
    },
    (usernameField,passwordField,done) => {
        try{
                                    User.findOne({
                                                    where: {
                                                        email: usernameField               //It can find the models just not this, 
                                                                                          //this is passed in the above anonymous function.
                                                    }
                                                })
                                                .then(user=>{
                                                    if(user != null){
                                                        console.log('This email is already taken');
                                                        //proceed forward with passport.
                                                        return done(null,false,{message:"This email is already taken."});
                                                    }
                                                    else
                                                    {
                                                        //Hash our password.
                                                        //bCrypt.hashSync(passwordField, bCrypt.genSaltSync(8), null);

                                                        bcrypt.hash(passwordField,BCRYPT_SALT_ROUNDS)
                                                                    //Do something with my password, like create a new user.
                                                                    .then(hashedPassword=>{
                                                                                User.create({email:usernameField, password:hashedPassword})
                                                                                .then(user=>{
                                                                                    console.log('New user created')
                                                                                    return done(null,user);
                                                                                });
                                                                    })
                                                    }
                                                });
            
        }
        catch(error){
        done(error);
        }
}

));





//Sign-In or Login version.
passport.use('local-signin', new LocalStrategy(
 
    { 
        usernameField: 'email',
        passwordField: 'password',
        session:false             
    },
    (usernameField,passwordField,done) => {
        try{
           
                                 User.findOne({
                                                    where: {
                                                        email: usernameField         
                                                    }
                                                })
                                                .then(user=>{
                                                                if(user === null){
                                                                    console.log('Bad email address provided.');
                                                                    return done(null,false,{message:"Bad email address"});
                                                                }
                                                            else
                                                                {
                                                                    //check our passwordds.
                                                                    bcrypt.compare(passwordField, user.password)
                                                                    .then(response=>
                                                                        {
                                                                                //if paswords do not match.
                                                                                if(response != true)
                                                                                    {
                                                                                                console.log('passwords do not match');
                                                                                                return done(null,false,{message:"Bad password."});

                                                                                    }

                                                                                        //If the passwords match!
                                                                                        console.log('passwords do match!');
                                                                                        return done(null,user);    
                                                                        })                                                     
                                                                    }
                                                        });
            
        }
                        //Catch any errors that may show up.
                        catch(error){                                
                                done(error);
                        }
}

));


//SerializeUser
passport.serializeUser(function(user, done) {
    done(null, user);
});

//Deserializeuser
passport.deserializeUser(function(user, done) {
    done(null, user);
});







//SETUP JSON WEB TOKEN KEY.
const opts = {
    jwtFromRequest: EXTRACTJWT.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: jwtSecret.secret,
};

//SETUP PASSPORT TO USE JWT
passport.use(
        'jwt',
        new JWTSTRATEGY(opts,(jwt_payload,done)=>{
                try{
                        
                        //2020-02-18 -- what is being passed over?
                        console.log(jwt_payload.id);
                    
                        //Find our user by their username
                        User.findOne({
                                    where: {
                                        username: jwt_payload.id,         
                                    }
                        })
                        .then(user=>{
                            //If user is found.
                            if(user){
                                    console.log('User is found.');
                                    done(null,user);
                            }
                            //User not found.
                            else{
                                    console.log('User is not found.')
                                    done(null,false);
                            }
                        });
                }
                catch(error){
                        done(error)
                }


        })


);






}

