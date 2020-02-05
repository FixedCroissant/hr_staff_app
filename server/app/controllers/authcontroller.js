var exports = module.exports = {}
 
exports.register = function(req, res) {
    res.render('register', { title: 'Register for Account' }); 
}

exports.login = function(req,res){

    res.render('login',
    {
        title:'login page'
    });

    //console.log(res);
    //Return to react and let app know that the person is logged
    //return res.json({loggedIn:true});
}

exports.dashboard = function(req,res){  
    
    return console.log('testing.... going to the dashboard?');
    //res.json({login: true});

    //go to react page
    res.redirect('http://localhost:3000/dashboard');
    
    //return console.log("youre logged in yay!");
    /*res.render('dashboard',
    {
        title:'Yay, you\'re signed in!'
    });*/
}



//Logout route -- destory the users session.
exports.logout = function(req, res) {
    
    //express.
    req.session.destroy(function(err) {
        //Go to the front end.
        //return res.redirect('http://localhost:3000/');
    
        res.redirect('/');
    });

    //res.json({loggedOut:"true"});

    //res.redirect('http://localhost:3000/');
}