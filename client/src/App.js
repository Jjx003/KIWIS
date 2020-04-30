import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import logo from './logo.svg';
import './css/App.css';


import PrivateRoute from './auth/PrivateRoute';
import Home from './routes/Home';
import SignUp from './routes/SignUp';
import Login from './routes/Login';

export var logged = false;

function App() {
  return (
			<div>
				<PrivateRoute exact path="/" component={Home}/>
				<Route exact path="/login" component={Login} />
				<Route exact path="/signup" component={SignUp} />
			</div>
  );
}

export default App;
