import React, { Component } from 'react';
import Sidebar from '../components/Sidebar';

class UserComponent extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      userList: []
    }
  }

  // Fetch the list on first mount
  componentDidMount() {
    this.getUserList();
  }

  // Retrieves the list of items from the Express app
  getUserList = () => {
    fetch(process.env.REACT_APP_API_URL+'/api/users',{})
    .then(res => res.json())
    .then(userList => this.setState({ userList}))
  }

  render() {
    const { userList } = this.state;

    return (
      <div>
                    <h4>List of Users</h4>
                    <ul>
                   {
                   userList.map((users)=>{
                                           return <li key={users.id}><a href='http://www.google.com'>Edit</a>  {users.lastname}, {users.firstname} </li>
                                         }
                        )
                    }
                    </ul>
      </div>
    );
  }
}

export default UserComponent;