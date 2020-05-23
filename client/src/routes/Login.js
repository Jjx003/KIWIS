import React, { useContext } from 'react';
import '../css/App.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
<<<<<<< HEAD
import { UpdateContext } from "../auth/Auth"
=======
import { AuthContext, UpdateContext } from "../auth/Auth"
>>>>>>> creating-posts

export const Login = ({history}) => {
	//const {currentUser} = useContext(AuthContext);
	let update = useContext(UpdateContext);
	
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
				const cooks = new Cookies();
				cooks.set('auth', response.data.token, {path: '/'});
				// Wait until update processes before redirecting
				update().then(()=>{
					history.replace('/');
				})
			} else {
				console.log("invalid credentials.");
			}
		  })
		  .catch((error) => {
			console.log(error);
		  });
	}

	const redirectSignUp = () => {
		history.push('/signup');
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
