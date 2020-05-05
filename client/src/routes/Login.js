import React, {useContext } from 'react';
import  { Redirect } from 'react-router-dom';
import '../css/App.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import {useCookies} from 'react-cookie';
import {AuthContext} from '../auth/Auth';

const Login = ({history}) => {
	const [cookies, setCookie] = useCookies(['auth-token']);
	
	const cooks = new Cookies();
	const handleLogin = (event) => {
		event.preventDefault();
		const {email, password} = event.target.elements;


		// send POST request to sign in user 
		axios({
			method: 'post',
			url: 'http://localhost:9000/auth/login',
			data: {
				email: email.value,
				password: password.value,
			}
		  })
		  .then((response) => {
			if (response.data.success) {
				cooks.set('auth', response.data.token, {path: '/'})
				history.push('/');
			} else {
				console.log("invalid credentials.");
			}
		  })
		  .catch((error) => {
			console.log(error);
		  });
	}
	const redirectSignUp = () => {
		return <Redirect to="/signup" />
	}	
	
	return(
	<div className="centered">
		<div className="row">
			<h1> Login </h1>
			<form onSubmit={handleLogin}>
				<label>
					Email
					<input name="email" type="email" placeholder="Email" />
				</label>
				<label>
					Password
					<input name="password" type="password" placeholder="Password" />
				</label>

				<button type="submit"> Log In </button>
			</form>

			<button onClick={redirectSignUp}> Sign Up </button>
		</div>
	</div>
	);
};

export default Login;