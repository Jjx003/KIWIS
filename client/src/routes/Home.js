import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import '../css/App.css';
import axios from 'axios';

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

class Home extends Component {
	/*
	static propTypes ={
		cookies: instanceOf(Cookies).isRequired
	};*/

	constructor(props) {
		super(props)
		this.state = {
			email: "",
			content: "",
		}
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		this.setState({
			[name]: value
		})
	}

	handleSubmit(event) {
		event.preventDefault();
		if (this.state.email && this.state.content && this.state.email) {
			sendEmail(this.state.email, this.state.content);
		}
	}

	signOut() {
		// GET request for signing out
		axios.defaults.withCredentials = true;
		axios({
			method: 'get',
			url: 'http://localhost:9000/auth/signOut',
			withCredentials: true
		  })
		  .then( (response) => { 
			  console.log(response.data.success);
			if (response.data.success) { 
				//removeCookie('auth-token', {path: '/'});
				const cookie = new Cookies();
				cookie.remove('auth', {path:'/'})
				this.props.history.push('/login');
				console.log("Should be signing out");
			} else {
				console.log("error when signing out.");
			}
		  })
		  .catch((error) => {
			console.log(error);
		  });
	}

	/*
	componentDidMount() {
		// check if user is logged in
		console.log("in here");
		fetch('http://localhost:9000/auth/checkIfSignedIn')
			.then(response => response.json())
			.then((data) => { if(data.success) { this.props.history.push('/login'); } });	
	}
*/
	render() {
		return(
			<div className="app">
				<h1> Home Page </h1>	
				<Button onClick={this.signOut.bind(this)}>Hi </Button>
				<div>
					<Form>
						<Form.Field>
							<label>Employee Email</label>
							<input name="email" type="email" placeholder="employee@company.com" onChange={this.handleInputChange} required />
						</Form.Field>
						<Form.Field>
							<label>Custom Message</label>
							<input name="content" placeholder="Welcome" onChange={this.handleInputChange}/>
						</Form.Field>
						<Button onClick={this.handleSubmit}>Send</Button>
					</Form>
				</div>
			</div>
		);
	}
}

export default Home;
