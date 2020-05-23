import React, { useContext } from 'react';
import { Button } from 'semantic-ui-react';
import '../css/App.css';
import axios from 'axios';
import {UpdateContext} from '../auth/Auth';
import firebase from '../auth/firebase';

import Cookies from 'universal-cookie';
import HomePosts from '../components/HomePosts'

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

	const createPost = () => {

		history.push('/createPost');


	}

	const handleSignOut = () => {
		firebase.auth().signOut();

		// removing cookie
		const cookies = new Cookies();
		cookies.remove('auth');

		// redirect to home page
		history.push("/login");
	}
		

	return(
		<div className="app">
			<HomePosts />
			<Button onClick={handleSignOut}>Signout</Button>
			<Button onClick={createPost}>Create Post</Button>
		</div>
	);
}



export default Home;
