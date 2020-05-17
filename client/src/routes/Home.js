import React, { useContext } from 'react';
import { Button } from 'semantic-ui-react';
import '../css/App.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {UpdateContext} from '../auth/Auth';

import Cookies from 'universal-cookie';
import Navbar from '../components/Navbar';

// Sorry we don't have a home for this function yet.
/*
async function sendEmail(targetEmail, targetContent) {
	let API_URL = "http://localhost:9000";
	let EMAIL_ROUTE = "/inviteUser";
	console.log(targetEmail)
	console.log(targetContent)
	const bodyContent = {
		"email": targetEmail,
		"content": targetContent,
	}
	console.log(bodyContent)
	console.log(JSON.stringify(bodyContent))
    const response = await fetch(API_URL + EMAIL_ROUTE, {
	method: 'POST',
	headers: {
	  Accept: 'application/json',
	  'Content-Type': 'application/json',
	},
	body: JSON.stringify(bodyContent)
  });
  console.log(response)
}
*/

const Home = ({history}) => {
	const updateFunction = useContext(UpdateContext);
	const handleSignOut = () => {
		axios.defaults.withCredentials = true;
		axios({
			method: 'get',
			url: 'http://localhost:9000/auth/signOut',
			withCredentials: true
		  })
		  .then((response) => { 
			console.log(response.data.success);
			if (response.data.success) { 
				const cookie = new Cookies();
				cookie.remove('auth', {path:'/'})
				updateFunction().then(()=>{
					// Replace is better here because we don't push to history.
					// AKA user can't press back button
					history.replace('/login');
				})
			} else {
				console.log("error when signing out.");
			}
		  })
		  .catch((error) => {
			console.log(error);
		  });
	}

	return(
		<div className="app">
			<Navbar/>
			<h1> Home Page </h1>	
			<Button onClick={handleSignOut}>Signout</Button>
			<Link to="/userTags">
				<Button> Hey</Button>
			</Link>
		</div>
	);
}



export default Home;
