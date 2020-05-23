import React from 'react';
import axios from 'axios';

import '../css/App.css';

class SignUp extends React.Component {
	state = {
		isLoading: true,
	}

	handleSignUp = (event) => {
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
				this.redirectLogin();
			} else {
				// update gui to show error in signing up
				console.log("error in sign up, most likely account has already been made");
			}
		}).catch((error) => {
			console.log(error);
		});
	}

	redirectLogin = () => {
		this.props.history.push("/login");
	};

	componentDidMount() {
		// check to see if data is valid 
		axios({
			method: 'post',
			url: 'http://localhost:9000/inviteUser/validateID',
			data: {
				uuid: this.props.match.params.id
			}
		  })
		  .then((response) => {
			if (response.data.success) {
				this.setState({isLoading: false});
			} else {
				alert("Invalid RegistrationID");
				this.props.history.push("/login");
			}
		  })
		  .catch((error) => {
			console.log(error);
		  });
	}
	render() {
		if (this.state.isLoading) {
			return <h1> Loading... </h1>
		}

	return(
		<div className="centered">
			<h1> Sign Up </h1>
			<form onSubmit={this.handleSignUp.bind(this)}>
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
			<button onClick={this.redirectLogin.bind(this)}> Log In </button>
		</div>
	);
	}
};

export default SignUp;
