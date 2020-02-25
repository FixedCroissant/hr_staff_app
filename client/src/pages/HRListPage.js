import React, { Component } from 'react';
import Sidebar from '../components/Sidebar';

import FooterBasePage from '../layout/FooterBasePage';

class HRListPage extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {        
      hrRequests: []     
    }
  }

  // Fetch the list on first mount
  componentDidMount() {
    this.getHRList();
  }


  // Retrieves the list of items from the Express app
  getHRList = () => {
    fetch('http://localhost:9000/api/hr/index',{})
    .then(res => res.json())
    .then(hrRequests => this.setState({hrRequests:hrRequests['myresults']}))
  }

  render() {   
    
    const { hrRequests } = this.state;
    return (
      <div>
                <Sidebar props={this.props} />
                <h3>All HR Requests:</h3>
                
                
                
                <table>
                          <thead>
                              <tr>
                                <th>Created</th>
                                <th>Req. Name</th>
                                <th>Req. Dept.</th>
                              </tr>
                            </thead>
                  
                  <tbody>
                          
                                      {
                                      hrRequests.map((hrrequest)=>{
                                      return <tr key={hrrequest.id}>
                                                                  <td>{hrrequest.createdAt}</td>
                                                                  <td>{hrrequest.requestor_firstname} {hrrequest.requestor_lastname}</td>
                                                                  <td>{hrrequest.requesting_department}</td>
                                              </tr>
                                            }
                                          )
                                      }
                         
                  </tbody>
                </table>
                <FooterBasePage/>
      </div>
    );
  }
}

export default HRListPage;