import React from 'react';
import {Route} from 'react-router-dom';
import './css/App.css';


import Home from './routes/Home';
import SignUp from './routes/SignUp';
import Login from './routes/Login';
import PrivateRoute from './auth/PrivateRoute';
//<PrivateRoute path="/" exact render={(props) => <Home {...props}/>}/>
import AddResponse from './routes/Responses';
import ViewPost from './routes/ViewPost';
//import CreatePosts from './routes/CreatePosts'

// algolia -> posts [(id,content, whatever)]
// click post->[search firebase data for this postID, content, resposnes]
// postid ->from firebase

// post -> click (dont pass down props CONTENT from algolia was this, display this)
// kiwis.tech/company/forum/POSTID
// route /POSTID:
// return the proper post information. 


function App() {
  return (
			<div>
				<Route path="/login" exact render={(props) => <Login {...props}/>}/>
				<Route path="/signup" exact render={(props) => <SignUp {...props}/>}/>
				<PrivateRoute path="/viewPost/:id" dynamic={true} component={ViewPost}/>
				<PrivateRoute exact path="/" component={Home} />
				<PrivateRoute exact path="/Response" component={AddResponse} /> 				
			</div>
  );
}
//<PrivateRoute exact path="/createPost" component={CreatePosts} />
export default App;
