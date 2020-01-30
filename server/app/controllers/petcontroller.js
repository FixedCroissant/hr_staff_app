var exports = module.exports = {}

exports.petscreate = function(req, res) {
    res.render('pet/index', { title: 'Please create your pet.' }); 
}
