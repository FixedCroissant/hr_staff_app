import React, { Component } from "react";
import Sidebar from "../components/Sidebar";
import FooterBasePage from "../layout/FooterBasePage";
import { Redirect } from "react-router-dom";

class UserPage extends Component {
  // Initialize the state
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      userList: []
    };
  }

  // Fetch the list on first mount
  componentDidMount() {
    this.getUserList();
  }

  // Retrieves the list of items from the Express app
  getUserList = () => {
    fetch(process.env.REACT_APP_API_URL+"/api/users", {credentials:'include'})
      .then(res => res.json())
      .then(userList => this.setState({ userList }))
      //Catch any error.
      .catch(error => {
        console.log("error: " + error);
        this.setState({ requestFailed: true });
      });
  };

  render() {
    const { userList } = this.state;
    console.log(userList);
   

    return  this.state.requestFailed ? (
      <Redirect to="/unauth"/>
    ) : (
      <div>
        <Sidebar props={this.props} />
        <h4>List of Users:</h4>
        <ul>
          {userList.map(users => {
            return (
              <li key={users.id}>
                <a href={"/user/" + users.id}>Details</a> {users.lastname},{" "}
                {users.firstname} -- {users.unityid}{" "}
              </li>
            );
          })}
        </ul>

        <FooterBasePage />
      </div>
    );
  }
}

export default UserPage;
