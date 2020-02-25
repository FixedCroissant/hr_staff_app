import React, { Component } from 'react';
import Sidebar from '../components/Sidebar';

class UserDetailPage extends Component {
  // Initialize the state
  constructor(props){
    super(props);

    //console.log(props.history);
    this.state = {
      userID: this.props.match.params.id,
      userItem: []
    }
  }

  // Fetch the list on first mount
  componentDidMount() {
    //console.log(this.props.match.params);
    this.getUserList();
  }

  // Retrieves the list of items from the Express app
  getUserList = () => {
    fetch('http://localhost:9000/api/user/'+this.state.userID,
    {
      method:'GET',
      headers: {
                'Content-Type': 'application/json'                
      }
  })
    .then(res => res.json())
    .then(userItem => this.setState( {userItem}))
  }

  render() {
    const { userItem } = this.state;

    return (
      <div>
                <Sidebar props={this.props} />
                    <h4>Specific User</h4>
                        {
                            userItem.map((user)=>{
                                return <div key={user.id}>
                                        <h3>{user.firstname}   {user.lastname}</h3>
                                        <div>
                                           <label htmlFor="firstname">First:</label>
                                           <input name="firstname" defaultValue={user.firstname}></input> <br/>
                                           
                                           <label htmlFor="lastname">Last:</label>
                                           <input name="lastname" defaultValue={user.lastname}></input> <br/>


                                            <label htmlFor="email" >EMail Address:</label>
                                            <input name='email' defaultValue={user.email} />  <br/>

                                            <label htmlFor="unityid" >UnityID:</label>
                                            <input name='unitiyd' defaultValue={user.unityid} />   

                                            


                                        </div>
                                  </div>
                             })
                            
                        }
                    
      </div>
    );
  }
}

export default UserDetailPage;