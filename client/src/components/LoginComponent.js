import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';




const useStyles = makeStyles(theme => ({

  ncsubutton:{
      background:'#990000'
  },
  paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', 
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}));


export default function LoginComponent ({onLoginChange}) {  
  const [email,setEmail] = React.useState("");
  const [password,setPassword] = React.useState("");
  const [error,setError] = React.useState("");
  
 const handleEMail = (event) => setEmail(event.target.value);
 const handlePassword = (event) => setPassword(event.target.value);

   const handleSubmit = (event)=>{
    
    event.preventDefault();   
    let myemail = email;
    let mypassword = password;

    
    fetch('http://localhost:9000/api/loginUser', {
      method: 'POST',
      headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json, text/plain,',
      },
      //Don't forget to specify this if you need cookies.
      credentials:'include',
      body: JSON.stringify({email: myemail, password:  mypassword}),      

    })
    //any errors.
    .then(response=>response.json())
    //Get information back
    .then((jsonData)=>{        

                          //Check for any errors returned.
                          if(jsonData.error){                              
                              //Debug information...
                              console.log("here are my login errors: " + jsonData.error)
                              //Set item in the template.
                              
                              //TODO THIS NEEDS TO BE FIXED FOR A FUNCTIONAL COMPONENT.
                              //this.setState({error: jsonData.error});
                              //console.log(jsonData.message);  
                              setError(jsonData.message);
        }

        //Check for any login authentication error messages.
        setError(jsonData.message);
     
        //Call our parent function that is called down.
        onLoginChange(jsonData.auth);
      
      }).catch(err => {
              console.log(err);
      });
   }

  const classes = useStyles();
  
  return (
                              <Container component="main" maxWidth="xs">
                                            <div >
                                                {/* ERROR MESSAGE                                            */}
                                                    <div>{error}</div> 
                                                    <form id="login" name="login" onSubmit={(e) => {handleSubmit(e)}} >


                                                    {/* onChange={e => this.handleChange(e)}  */}

                                                            <TextField margin= "normal"   value = {email} name="email" onChange={e=>handleEMail(e)}  required id="standard-basic" label="EMail Address" /> <br/>
                                                            <TextField margin= "normal"   value ={password} name="password" type="password"    onChange={e=>handlePassword(e)}  required id="standard-basic" label="Password"/>
                                                            <br/>
                                                            <Button className={classes.ncsubutton} variant="contained" color="primary" type="submit">Login</Button>
                                                            
                                                    </form>
                                            </div>
                              </Container>
                  );
}