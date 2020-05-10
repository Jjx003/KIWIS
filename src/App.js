import React from 'react';
import './css/App.css';
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";


import Home from './routes/Home';
import Login from './routes/Login';
import SignUp from './routes/SignUp';
import UserTags from './routes/UserTags';
import Settings from './routes/Settings';

function App() {
  return (
    <Router>
      <div className="App">
	 	    <Route path="/" exact render={(props) => <Home {...props}/>} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/settings" component={Settings} />
      </div>
    </Router>
  );
}
/*<Route exact path="/signup" component={SignUp} />*/

export default App;
