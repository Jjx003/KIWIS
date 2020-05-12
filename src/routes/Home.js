import React from 'react';
import {withRouter}from 'react-router-dom';
import HomePage from '../components/HomePage'

class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <HomePage/>
      </div>
    );
  }
  
}

export default withRouter(Home);
