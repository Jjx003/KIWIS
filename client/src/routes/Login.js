import React, { useContext } from 'react';
import '../css/App.css';
import Cookies from 'universal-cookie';
import { UpdateContext } from "../auth/Auth";
import db from '../auth/firebase';

export const Login = ({ history }) => {
	//const {currentUser} = useContext(AuthContext);
	let update = useContext(UpdateContext);

	const handleLogin = (event) => {
		event.preventDefault();
		const { email, password } = event.target.elements;

		// sign in user
		db.auth().signInWithEmailAndPassword(email.value, password.value).then(() => {

			// create token for user
			db.auth().currentUser.getIdToken(true).then((idToken) => {
				// store token into cookie 
				const cookies = new Cookies();
				cookies.set('auth', idToken, { path: '/' });

				// redirect to home page
				update().then(() => {
					history.push('/');
				});
			})
				.catch((error) => console.log(error));

		}).catch((error) => {
			console.log(error);
		});
	}

	const redirectSignUp = () => {
		history.push('/signup');
	}

	return (
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
