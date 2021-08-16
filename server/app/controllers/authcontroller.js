var exports = module.exports = {}
//Get Sequelize.
var sequelize = require("sequelize");
//Get Models.
var models = require("../models");
const User = models.User;
const Role = models.Role;
const HRRequest = models.hrrequest;

//Create a email setup using nodemodemailer.
import nodemailer from 'nodemailer';







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
                res.json(singleUser)                
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

    //Send email, declared further down the file.
    exports.sendBasicMessage();    
    //End sending email.


    //Send information back.
    //return res.json({saveHrRequest: req.body});
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
                            attributes: ['id','createdAt','updatedAt','requesting_department','cabinet_member','effective_date','requestor_firstname', 'requestor_lastname']
                        })
    
    //Pulled information now send databack.
    .then(myresults=>{
            //Send information back.                                
           //myresults=>res.status(201).json({myresults})
           res.status(201).json(myresults)
        }      
    ); 
}

//Get HR item details.
exports.hrShowRequest = function(req,res){
//Possible switch to findbyPK.
HRRequest.findOne({
    attributes:['id','requestor_firstname','requestor_lastname','cabinet_member','requesting_department'],
    where:{
        id: req.params.id
    }
})
.then(singleHRRequest=>
        res.json(singleHRRequest)
);
}

//Update HR Request.
exports.HRUpdateRequest =  async function(req,res){
    try{
                const myItemToUpdate = await HRRequest.findByPk(req.params.id);
                myItemToUpdate.update(
                    {
                        requestor_lastname:req.body.requestor_lastname,
                        requestor_firstname:req.body.requestor_firstname,
                        requesting_department:req.body.requesting_department
                    }
                ).then(result=>{
                    return res.status(200).send({message:"Successful update of records."})
                        }
                    
                       )
    }
    catch(error){
                return res.send({error:"CANNOT UPDATE RECORD: There is nothing found for HR Record Number:"+req.params.id})
                //Error handling
                //return console.log("There was an error finding this record." +"There is nothing found for HR Record Number:" + req.params.id );
    }


    //res.json(myItemToUpdate)

  //  return console.log(myItemToUpdate)

}

//See current roles.
exports.findAllRoles = function(req,res){
    Role.findAll({
        attributes: ['id','rolename']
    }) 
    .then(        
        r=>res.json(r)
    );
}



//Go to dashboard.
exports.dashboard = function(req,res){  
    //return console.log('testing.... going to the dashboard?');
    res.json({login: true});

}


//Logout route -- destory the users session.
exports.logout = function(req, res) {

    //Remember to clear the cookie.

    //Goback to the homepage.
    /*this.props.history.push({
        pathname: "/dashboard",
        state: { isLoggedIn: this.state.isLoggedIn }
      });*/
    
    //express.
    req.session.destroy(function(err) {
        
        console.log('wanna log this person out dont you?');

        //Remove our cookies.  
        res.clearCookie('logged_in');
        res.clearCookie('jwt');
        
        //Go to the front end.
        return res.json({loggedIn:false});
    });
}

//Send basic generic message.
exports.sendBasicMessage = function(req,res){
    //Setup email message.
    let transporter = nodemailer.createTransport({
        host: "smtp.test.io",
        port: 2525,
        auth: {
          user: "XXXX",
          pass: "XXXX"
        }
      });

      let mailOptions = {
        from: '"A Fake EMail Address" <fake@example.com>', 
        to: "fake@example.com", 
        subject: "HR Staff Application - New Submission", 
        html: "<body><p>This is a test and only a test of the NodeMailer system sent through NodeJS. <br/>\
         This is a another line right here. </br> And another line right here.</p></body>" 
      };
      //Send message.
      transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    return console.log(error);
                }
                console.log("Message sent: " + info.response);
        });      
      //End send message.
}