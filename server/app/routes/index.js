var express = require('express');
var router = express.Router();

//Pug templating.
const pug = require('pug');

//Get Model.
var models = require("../models");
var Pet = models.Pet;


/* GET home page. */
router.get('/', function(req, res, next) {
  
  
  res.render('index', { title: 'Hello Everyone.' });
});


/**NEEDS TO GO TO A CONTROLLER.*/
router.get('/pets',function(req,res,next){

  /*let myPets;

    //Go our list of pets. 
  //Find our pets
  models.Pet.findAll()
  .then(ourPets=>{
                myPets = ourPets;
        }
    );*/

    //var theGreat = "<span>escape!</span>";

  var theGreat = models.Pet.findAll()
                .then(ourPets=>{
                              
                              //console.log(ourPets);
                              /*ourPets.forEach(
                                (pets)=>{
                                  //console.log(pets.dataValues)

                                  pets.dataValues;

                              })*/

                              res.json(ourPets);
                   }
            );

            console.log(theGreat);

    res.render('pet/index',{title:'List Pets',theGreat: theGreat, message: req.flash('message')})
});



/*CREATE PETS*/
router.get('/pets/create',function(req,res,next){

          let myPets;

            //Go our list of pets. 
          //Find our pets
          models.Pet.findAll()
          .then(ourPets=>{
                        myPets = ourPets;
                }
            );
          
            res.render('pet/create',{title:'What kind of pet?', message: req.flash('message'), pets: myPets})
});
/*POST PETS*/
router.post('/pet/store',function(req,res,next)
{ 

  //ES6 Function.
  models.Pet.create(
        {type:req.body.pettype,name:req.body.petsname,weight:10}
    )
  .then(newAnimal => {
    console.log(`New Animal ${newAnimal.name}, with id ${newAnimal.id} has been created.`);
  });
  //End Create

  /*Example
  var myFunc = (item)=>{
            console.log("this is my item"+item);
  }
  myFunc("Kittens ");
  */

  //Create flash message.
  req.flash('message', 'New animal has been saved.')

  //Go back....
  res.redirect('back');

      
});






module.exports = router;
