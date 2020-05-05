import React, { Component, useContext } from 'react';
import { Button, Form } from 'semantic-ui-react';
import '../css/App.css';
import axios from 'axios';
import {ModifyAuthEvent, UpdateContext} from '../auth/Auth';

import Cookies from 'universal-cookie';


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

const Home = ({history}) => {
	const updateFunction = useContext(UpdateContext);
	const handleEmail = (event) => {
		event.preventDefault();
		let {email, content} = event.target.elements;
		if (email && content) {
			sendEmail(email.value, content.value);
		}
	}
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
				console.log("why are you logging out")
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
			<h1> Home Page </h1>	
			<Button onClick={handleSignOut}>Signout</Button>
			<div>
				<Form>
					<Form.Field>
						<label>Employee Email</label>
						<input name="email" type="email" placeholder="employee@company.com" required />
					</Form.Field>
					<Form.Field>
						<label>Custom Message</label>
						<input name="content" placeholder="Welcome"/>
					</Form.Field>
					<Button onClick={handleEmail}>Send</Button>
				</Form>
			</div>
		</div>
	);
}



export default Home;
