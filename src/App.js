import React from 'react';
import { Route } from 'react-router-dom';
import './css/App.css';

import Home from './routes/Home';
import TagTester from './routes/TagTester';

function App() {
  return (
    <div className="App">
	 	<Route path="/" exact render={(props) => <Home {...props}/>} />
	 	<Route path="/tagTester" exact render={(props) => <TagTester {...props}/>} />
    </div>
  );
}

export default App;
