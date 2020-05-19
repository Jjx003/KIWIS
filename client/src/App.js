import React from 'react';
import {Route} from 'react-router-dom';
import './css/App.css';


import Home from './routes/Home';
import SignUp from './routes/SignUp';
import Login from './routes/Login';
import PrivateRoute from './auth/PrivateRoute';
import settings from "./routes/Settings";
import AdminPage from "./routes/AdminPage"

function App() {
  return (
			<div>
				<Route path="/login" exact render={(props) => <Login {...props}/>}/>
				<Route path="/signup" exact render={(props) => <SignUp {...props}/>}/>
				<PrivateRoute exact path="/" component={Home} />
				<PrivateRoute exact path="/settings" component={settings} />
				<PrivateRoute exact path="/adminPage" component={AdminPage} />

			</div>
  );
}

export default App;
