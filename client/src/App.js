import React from 'react';
import {Route} from 'react-router-dom';
import './css/App.css';


import Home from './routes/Home';
import SignUp from './routes/SignUp';
import Login from './routes/Login';
import PrivateRoute from './auth/PrivateRoute';
//<PrivateRoute path="/" exact render={(props) => <Home {...props}/>}/>
import AddResponse from './routes/Responses';

function App() {
  return (
			<div>
				<Route path="/login" exact render={(props) => <Login {...props}/>}/>
				<Route path="/signup" exact render={(props) => <SignUp {...props}/>}/>
				<PrivateRoute exact path="/" component={Home} />
				<PrivateRoute exact path="/Response" component={AddResponse} /> 				
			</div>
  );
}

export default App;
