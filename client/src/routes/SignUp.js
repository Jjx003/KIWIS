import React, { useCallback } from 'react';
import Auth from "../auth/Auth";
import '../css/App.css';

const SignUp = ({ history } ) => {
	const handleSignUp = (event) => {
		event.preventDefault();
		const {email, password} = event.target.elements;
		let attempt = Auth.signUp(email.value, password.value);

		try {
			if (attempt) {
				history.push("/login");
			} else {
				alert("There was an error in signup. Did you enter a valid email/password?");
			}
		} catch(error) {
			alert(error)
		}
	}

	const redirectLogin = () => {
		history.push("/");
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
