import React from 'react';
import { Route } from 'react-router-dom';
import './css/App.css';


import Home from './routes/Home';
import SignUp from './routes/SignUp';
import AdminSignUp from './routes/AdminSignUp'
import Login from './routes/Login';
import PrivateRoute from './auth/PrivateRoute';

function App() {
<<<<<<< HEAD
  return (
			<div>
				<Route path="/login" exact render={(props) => <Login {...props}/>}/>
				<Route path="/signup/:id" exact render={(props) => <SignUp {...props}/>}/>
				<Route path="/signup" exact render={(props) => <Login {...props}/> }/>
				<PrivateRoute exact path="/" component={Home} />
			</div>
  );
=======
	return (
		<div>
			<Route path="/login" exact render={(props) => <Login {...props} />} />
			<Route path="/signup" exact render={(props) => <SignUp {...props} />} />
			<Route path="/adminsignup" exact render={(props) => <AdminSignUp {...props} />} />
			<PrivateRoute exact path="/" component={Home} />
		</div>
	);
>>>>>>> login/register
}

export default App;
