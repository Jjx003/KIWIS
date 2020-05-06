import React from 'react';
import Navbar from '../components/Navbar'
import '../css/Home.css';
import HomePosts from "../components/HomePosts";

class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <Navbar />
        <HomePosts />
      </div>
    );
  }
}

export default Home;
