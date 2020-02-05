import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';


class LoginComponent extends Component {

  constructor(props) {
    super(props);
    //this.state  = this.props.isLoggedInItem;

    this.state = {
        email: "",
        password:"",
        error:""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }  

  handleSubmit(event) {
    event.preventDefault();
    
    let myemail = this.state.email;
    let mypassword = this.state.password;

    //return console.log(email + password)

    
    fetch('http://localhost:9000/api/login', {
      method: 'POST',
      headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json, text/plain,',
      },
      body: JSON.stringify({email: myemail, password:  mypassword}),
      

    })
    //any errors.
    .then(response=>response.json())
    //Get information back
    .then((jsonData)=>{        

        //Check for any errors returned.
        if(jsonData.error){
            
            //Debug information...
            //console.log("here are my errors" + jsonData.error)
            //Set item in the template.
            this.setState({error: jsonData.error});
        }

        //Check if any error happens.
        return console.log(jsonData);

        //Check if should be logged in
        //return console.log(jsonData.loggedIn);
        //this.setState({loggedIn:jsonData.loggedIn});
        //this.props.onLoginChange(jsonData.loggedIn);
      }).catch(err => {
              console.log(err);
      });
  }

 
 handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
}

  render() {

          return (
                              <Container component="main" maxWidth="xs">
                                            <div >
                                                {/* ERROR MESSAGE                                            */}
                                                    <div>{this.state.error}</div>
                                                    <form id="login" name="login" onSubmit={(e) => {this.handleSubmit(e)}} >
                                                            <label>Email Address:</label>
                                                            <input type="email" value={this.state.email} name="email" onChange={e => this.handleChange(e)} ></input>
                                                            <br/>


                                                            <label>Password:</label>            
                                                            <input type="password"  value ={this.state.password} name="password" onChange={e => this.handleChange(e)}></input>    

                                                            <br/>
                                                            <Button  type="submit">Log In</Button>
                                                    </form>
                                            </div>
                              </Container>
                  );
  }
}

export default LoginComponent;