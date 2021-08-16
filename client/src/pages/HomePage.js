import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import LoginComponent from "../components/LoginComponent";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false };
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.routeDirection = this.routeDirection.bind(this);
  }

  handleLoginChange(initialValue) {
    this.setState({ isLoggedIn: initialValue });

    //Go to the next page.
    this.routeDirection();
  }

  routeDirection() {
    if (this.state.isLoggedIn === true) {
      console.log("Person should be able to login.");

      //Redirect to a new route.
      //this.props.history.push("/dashboard");

      this.props.history.push({
        pathname: "/dashboard",
        state: { isLoggedIn: this.state.isLoggedIn }
      });
    } else {
      console.log("Login failed... sorry mate you cannot log in yet.");
      this.props.history.push("/");
    }
  }

  render() {
    //Temporary user.
    //const user = { name: "JOSH", loggedIn: false };

    return (
      <div>
          Home page yay.
           <LoginComponent onLoginChange={this.handleLoginChange} /> 
        
      </div>
    );
  }
}

export default withRouter(HomePage);
