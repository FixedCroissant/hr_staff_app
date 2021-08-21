import React, { Component } from "react";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router";
import LoginComponent from "../components/LoginComponent";
import Sidebar from "../components/Sidebar";
import FooterBasePage from '../layout/FooterBasePage';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false};
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.routeDirection = this.routeDirection.bind(this);
  }

  handleLoginChange(initialValue) {
    this.setState({ isLoggedIn: initialValue });

    //Go to the next page.
    this.routeDirection();
  }

  componentDidMount(){
    //Set initial state from history.
    this.props.history.push({
      pathname: "/",
      state: { isLoggedIn: this.state.isLoggedIn }
    });
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
    return (
      <div>
           <Sidebar/> 
           <LoginComponent onLoginChange={this.handleLoginChange} />
           <FooterBasePage/>
      </div>
    );
  }
}

export default withRouter(HomePage);
