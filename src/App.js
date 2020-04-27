import React from 'react';
import { Route } from 'react-router-dom';
import './css/App.css';

import Home from './routes/Home';
import Auth from './auth/Auth';
import PrivateRoute from './auth/PrivateRoute';

function App() {
  return (
    <div className="App">
	 	<Route path="/" exact render={(props) => <Home {...props}/>} />
    </div>
  );
}

export default App;
