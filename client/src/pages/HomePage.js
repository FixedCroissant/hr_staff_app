import React, {Component} from 'react';
import { Link } from "react-router-dom";
import LoginComponent from '../components/LoginComponent';

class HomePage extends Component 
{

constructor(props) {
        super(props);
        this.state = {isLoggedIn: false };
        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.routeDirection = this.routeDirection.bind(this);
    }  

handleLoginChange(initialValue) {
        this.setState({isLoggedIn: initialValue});

        //Go to the next page.
        this.routeDirection();  
       
}

routeDirection(){
    if (this.state.isLoggedIn === true) {
        console.log("Person should be able to login.");
                
                this.props.history.push("/dashboard");
   }else{
        console.log("Login failed... sorry mate you cannot log in yet.");
        this.props.history.push("/")
    }
}


  
render(){
                return (
                    <div className="">
                            <LoginComponent onLoginChange = {this.handleLoginChange}/>
                    </div>
                )
}
  
}

export default HomePage;