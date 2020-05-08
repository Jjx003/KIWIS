import React from 'react';
import { Redirect, Route} from 'react-router-dom';
import './css/App.css';


import Home from './routes/Home';
import SignUp from './routes/SignUp';
import Login from './routes/Login';
import PrivateRoute from './auth/PrivateRoute';

function App() {
  return (
			<div>
				<Route path="/login" exact render={(props) => <Login {...props}/>}/>
				<Route path="/signup" exact render={(props) => <SignUp {...props}/>}/>
				<PrivateRoute exact path="/" component={Home} />
			</div>
  );
}

export default App;
