import React, { useContext } from 'react';
import { Button } from 'semantic-ui-react';
import '../css/App.css';
import axios from 'axios';
import { UpdateContext } from '../auth/Auth';
import { withRouter } from 'react-router-dom';

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

const Home = ({ history }) => {

	return (
		<div className="app">
			<HomePosts />
		</div>
	);
}



export default withRouter(Home);