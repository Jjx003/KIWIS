import React from 'react';
import './css/App.css';
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";


import Home from './routes/Home';
import Login from './routes/Login';
import SignUp from './routes/SignUp';
import UserTags from './routes/UserTags';

function App() {
  return (
    <Router>
      <div className="App">
	 	    <Route path="/" exact render={(props) => <Home {...props}/>} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route path="/userTag" exact render={(props) => <UserTags {...props}/>} />
      </div>
    </Router>
  );
}

export default App;
