import React from 'react';
import { Route } from 'react-router-dom';
import './css/App.css';


import Home from './routes/Home';
import SignUp from './routes/SignUp';
import AdminSignUp from './routes/AdminSignUp'
import Login from './routes/Login';
import PrivateRoute from './auth/PrivateRoute';
import settings from "./routes/Settings";
import AdminPage from "./routes/AdminPage"
import UserTags from './routes/UserTags';

function App() {
  return (
			<div>
				<Route path="/userTags" exact render={(props) => <UserTags {...props}/>}/>
				<Route path="/signup/:id" exact render={(props) => <SignUp {...props}/>}/>
				<Route path="/signup" exact render={(props) => <Login {...props}/> }/>
				<Route path="/login" exact render={(props) => <Login {...props}/> }/>
				<Route path="/adminsignup" exact render={(props) => <AdminSignUp {...props} />} />
				<PrivateRoute exact path="/" component={Home} />
				<PrivateRoute exact path="/settings" component={settings} />
				<PrivateRoute exact path="/adminPage" component={AdminPage} />

			</div>
  );
}

export default App;
