import React from 'react';
import { Route } from 'react-router-dom';
import './css/App.css';

import Home from './routes/Home';
import db from './db/index.js';

// import Posts from './components/Posts';
// import DisplayData from './components/DisplayData';


function App() {

  return (
  <div>
    
  </div>

  );

/*  return (
    <div className="App">
	 	<Route path="/" exact render={(props) => <Home {...props}/>} />
    </div>
  );
  */
}


/*
function App() {
  return (
    <div className="App">
	 	<Route path="/" exact render={(props) => <Posts {...props}/>} />
     <Route path="/" exact render={(props) => <DisplayData {...props}/>} />
    </div>
  );
}
*/

export default App;
