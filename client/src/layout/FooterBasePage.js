import React, { Component } from 'react';

class FooterBasePage extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }


  render() {
                        return (
                        <footer>
                            Footer Item
                        
                        </footer>
                        );
  }
}

export default FooterBasePage;