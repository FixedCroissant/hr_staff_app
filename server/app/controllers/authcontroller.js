var exports = module.exports = {}
//Get Sequelize.
var sequelize = require("sequelize");
//Get Models.
var models = require("../models");
const User = models.User;






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


//Find all users.
exports.findAllUsers = function(req,res){
    
    //Find all users and their assigned roles.
    User.findAll({
        attributes: ['id', 'firstname','lastname','email','createdAt','updatedAt','unityid'],
        include:['role']}
        )    
    .then(        
        r=>res.json(r)
        );

}
//Find specific user.
exports.findUser = function(req,res){
        //Possible switch to findbyPK.
        User.findAll({
            attributes:['id','firstname','lastname','email','unityid'],
            where:{
                id: req.params.id
            }
        })
        .then(singleUser=>{
                res.json(singleUser);
        });
}

//Save new HR request.
exports.hrStoreRequest=  async function(req,res){

    //See what information I'm passinge over.
    //return console.log(req.body);

    //Create new HR Item in the system to review.
    const newHrItem = await models.hrrequest.create({
                                requesting_department: req.body.hrpartnername, 
                                requestor_firstname: req.body.hrrequestorfirstname,
                                requestor_lastname: req.body.hrrequestorlastname,
                                cabinet_member:req.body.cabinet_member,
                                effective_date:req.body.effective_date,
                                employee_firstname:req.body.employee_firstname,
                                employee_lastname:req.body.employee_lastname,
                                employee_position_number:req.body.employee_position_number,
                                former_employee_firstname:req.body.former_employee_firstname,
                                former_employee_lastname:req.body.former_employee_lastname,
                                category:req.body.category,
                                employee_flsa:req.body.employee_flsa,
                                request_type:req.body.request_type,
                                purpose_of_request:req.body.purpose,
                                employee_justification:req.body.employee_justification
                            })
    //Catch our errors that we may have.
    .catch(() => {
        console.error('Whoops! there was an error saving to the database.');
    })

    //Send information back.
    return res.json({saveHrRequest: req.body});
}


//See all HR requests in the system.
exports.hrIndexRequest = function(req,res){


    //Find all users and their assigned roles.
    models.hrrequest.findAll({
                            
                            // Add order conditions here....
                            order: [
                                    ['createdAt', 'ASC'],
                            ],
                            //Select  specific fields.
                            attributes: ['createdAt','updatedAt','requesting_department','cabinet_member','effective_date','requestor_firstname', 'requestor_lastname']
                        })
    
    //Pulled information now send databack.
    .then(        
           //Send information back.                                
           myresults=>res.json({myresults})
    ); 
}



//Go to dashboard.
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
        
        console.log('wanna log this person out dont you?');
        //Go to the front end.
        return res.json({loggedIn:false});
    });
}