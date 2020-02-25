import React, { Component } from 'react';

class BackendBasePage extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }


  render() {
    return (
      <div>
        Base Page, all the good stuff right here. Whoo hoo!      
      </div>
    );
  }
}

export default BackendBasePage;