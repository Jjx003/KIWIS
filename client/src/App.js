import React from 'react';
import { Route } from 'react-router-dom';
import './css/App.css';

// page imports
import Home from './routes/Home';
import SignUp from './routes/SignUp';
import Login from './routes/Login';

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
