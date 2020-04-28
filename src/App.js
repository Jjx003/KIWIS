import React from 'react';
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import './css/App.css';

import Home from './routes/Home';

function App() {
  return (
    <BrowserRouter>
			<div className="App">
	 			<Route path="/" exact render={(props) => <Home {...props}/>} />
    	</div>
  	</BrowserRouter>
  );
}

export default App;
