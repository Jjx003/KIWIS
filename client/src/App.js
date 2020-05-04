import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './css/App.css';


import Home from './routes/Home';
import SignUp from './routes/SignUp';
import Login from './routes/Login';
import PrivateRoute from './auth/PrivateRoute';


function App() {
  return (
			<div>
				<Route path="/" exact render={(props) => <Home {...props}/>}/>
				<Route path="/login" exact render={(props) => <Login {...props}/>}/>
				<Route path="/signup" exact render={(props) => <SignUp {...props}/>}/>
			</div>
  );
}

export default App;
