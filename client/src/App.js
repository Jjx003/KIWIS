import React from 'react';
import {Route} from 'react-router-dom';
import './css/App.css';


import Home from './routes/Home';
import SignUp from './routes/SignUp';
import Login from './routes/Login';
import PrivateRoute from './auth/PrivateRoute';
import UserTags from './routes/UserTags';

function App() {
  return (
			<div>
				<Route path="/login" exact render={(props) => <Login {...props}/>}/>
				<Route path="/signup" exact render={(props) => <SignUp {...props}/>}/>
				<Route path="/userTags" exact render={(props) => <UserTags {...props}/>}/>
				<PrivateRoute exact path="/" component={Home} />
			</div>
  );
}

export default App;
