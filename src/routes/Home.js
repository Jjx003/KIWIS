import React from 'react';
import Navbar from '../components/Navbar'
import '../css/Home.css';

class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <Navbar /> 
        <div className="posts-container">
          <p> here </p>
          <p> here </p>
          <p> here </p>
          <p> here </p>
          <p> here </p>
          
        </div>

      </div>
    );
  }
}

export default Home;
