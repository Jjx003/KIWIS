import React from 'react';
import axios from 'axios';

import '../css/App.css';

const SignUp = ({ history } ) => {
	const handleSignUp = (event) => {
		event.preventDefault();
		const {email, password} = event.target.elements;

		axios({
			method: 'post',
			url: 'http://localhost:9000/auth/signUp',
			data: {
				email: email.value,
				password: password.value,
			}
		}).then((response) => {
			if (response.data.success) {
				redirectLogin();
			} else {
				// update gui to show error in signing up
				console.log("error in sign up, most likely account has already been made");
			}
		}).catch((error) => {
			console.log(error);
		});
	}

	const redirectLogin = () => {
		history.push("/login");
	};

	return(
		<div className="centered">
			<h1> Sign Up </h1>
			<form onSubmit={handleSignUp}>
				<label> 
					Email
					<input name="email" type="email" placeholder="Email" />
				</label> 
				<label>
					Password
					<input name="password" type="password" placeholder="Password" />
				</label> 

				<button type="submit"> Sign Up </button>
			</form> 
			<button onClick={redirectLogin}> Log In </button>
		</div>
	);
};

export default SignUp;