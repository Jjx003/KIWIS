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
				<Route path="/" exact component={Home} />
				<Route path="/login" exact component={Login}/>
				<Route path="/signup" exact component={SignUp}/>
			</div>
  );
}

export default App;
