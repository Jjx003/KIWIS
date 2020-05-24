import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import './css/App.css';


import Home from './routes/Home';
import SignUp from './routes/SignUp';
import AdminSignUp from './routes/AdminSignUp'
import Login from './routes/Login';
import PrivateRoute from './auth/PrivateRoute';
import Settings from "./routes/Settings";
import AdminPage from "./routes/AdminPage"
import UserTags from './routes/UserTags';

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




//<Route path="/signup" exact render={(props) => <Login {...props}/> }/> we took this out
function App() {
  return (
			<div>

				<Route path="/userTags" exact render={(props) => <UserTags {...props}/>}/>
				<Route path="/signup/:id" exact render={(props) => <SignUp {...props}/>}/>
				<Route path="/login" exact render={(props) => <Login {...props}/> }/>
				<Route path="/signup" exact render={(props) => <Login {...props}/> }/>
				<Route path="/adminsignup" exact render={(props) => <AdminSignUp {...props} />} />

				<PrivateRoute path="/viewPost/:id" dynamic={true} component={ViewPost}/>
				<PrivateRoute exact path="/" component={Home} />
				<PrivateRoute exact path="/settings" component={Settings} />
				<PrivateRoute exact path="/adminPage" component={AdminPage} />
				<PrivateRoute exact path="/Response" component={AddResponse} /> 				
			</div>
  );
}
//<PrivateRoute exact path="/createPost" component={CreatePosts} />
export default withRouter(App);