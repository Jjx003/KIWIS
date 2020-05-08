import React from 'react';
import { Route, withRouter } from 'react-router-dom';

import './css/App.css';
import Home from './routes/Home';
import ViewPost from './routes/ViewPost';

function App() {
  return (
    <div className="App">
      <Route path="/" exact render={(props) => <Home {...props} />} />
      <Route path="/viewPost" exact render={(props) => <ViewPost {...props} /> }/>
    </div>
  );
}

export default withRouter(App);
