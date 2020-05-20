import React from 'react';
import {Route} from 'react-router-dom';
import './css/App.css';


import Home from './routes/Home';
import SignUp from './routes/SignUp';
import Login from './routes/Login';
import PrivateRoute from './auth/PrivateRoute';
import CreatePost from './routes/CreatePost';

function App() {
  return (
			<div>
				<Route path="/login" exact render={(props) => <Login {...props}/>}/>
				<Route path="/signup/:id" exact render={(props) => <SignUp {...props}/>}/>
				<Route path="/signup" exact render={(props) => <Login {...props}/> }/>
				<PrivateRoute exact path="/" component={Home} />
				<PrivateRoute exact path="/createPost" component={CreatePost} />
			</div>
  );
}

export default App;
