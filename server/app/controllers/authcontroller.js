var exports = module.exports = {}
 
exports.register = function(req, res) {
    res.render('register', { title: 'Register for Account' }); 
}

exports.login = function(req,res){
    
    res.render('login', { title:'Login Please',message: req.flash('loginMessage') });
}

exports.dashboard = function(req,res){
    res.render('dashboard',
    {
        title:'Yay, you\'re signed in!'
    });
}

//Logout route -- destory the users session.
exports.logout = function(req, res) {
 
    req.session.destroy(function(err) {
 
        res.redirect('/');
 
    });
 
}