import React, { Component } from "react";
import Sidebar from "../components/Sidebar";
import FooterBasePage from "../layout/FooterBasePage";
import { Redirect } from "react-router-dom";

class RoleListPage extends Component {
  // Initialize the state
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      roleList: []
    };
  }

  // Fetch the list on first mount
  componentDidMount() {
    this.getRoleList();
  }

  // Retrieves the list of roles from the Express app
  getRoleList = () => {
    fetch("http://localhost:9000/api/roles", {})
      .then(res => res.json())
      .then(roleList => this.setState({ roleList }))
      //Catch any error.
      .catch(error => {
        console.log("error: " + error);
        this.setState({ requestFailed: false });
      });
  };

  render() {
    const { roleList } = this.state;
    console.log(roleList);
   

    return  this.state.requestFailed ? (
      <Redirect to="/unauth"/>
    ) : (
      <div>
        <Sidebar props={this.props} />
        <h4>List of Roles:</h4>
        <ul>
          {roleList.map(role => {
            return (
              <li key={role.id}>
                <a href={"/role/" + role.id}>{role.rolename}</a> 
              </li>
            );
          })}
        </ul>

        <FooterBasePage />
      </div>
    );
  }
}

export default RoleListPage;
