import React from 'react';
import Navbar from '../components/Navbar'
import { Container } from 'semantic-ui-react';
import '../css/Home.css';

class Home extends React.Component {
  render() {
    return (
      <div>
        <Navbar /> 
        <Container className="container">
          <p> here </p>
        </Container> 

      </div>
    );
  }
}

export default Home;
