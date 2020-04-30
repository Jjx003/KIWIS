import React, {useContext} from 'react';
import { Redirect } from "react-router-dom";
import Auth from '../auth/Auth';
import '../css/App.css';

export const Login = ({history}) => {

	const handleLogin = (event) => {
		event.preventDefault();
		const {email, password} = event.target.elements;
		
		try {

			if(Auth.login(email.value, password.value)) {
				history.push("/");
			} else {
				alert("Invalid Credentials, Try Again.");
			}

		} catch (error) {
			alert(error);
		}
	}

	const {currentUser} = useContext(Auth.AuthContext);
	if (currentUser) {
		return <Redirect to="/" />;
	}

	const redirectSignUp = () => {
		history.push("/signup");
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
