import React, { Component } from 'react';
import { Button} from 'semantic-ui-react';
import '../css/App.css';
import axios from 'axios';
import Cookies from 'universal-cookie';

class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			email: "",
			content: "",
			isAuthenticated: false,
			isLoading: true,
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
				const cookie = new Cookies();
				cookie.remove('auth', {path:'/'})
				this.props.history.push('/login');
			} else {
				console.log("error when signing out.");
			}
		  })
		  .catch((error) => {
			console.log(error);
		  });
	}

	componentDidMount() {
		// checks if user is signed in 
		axios({
			method: 'get',
			url: 'http://localhost:9000/auth/checkIfSignedIn',
			withCredentials: true
		  })
		  .then( (response) => { 
			this.setState({isLoading: false});
			if (response.data.success) { 
				this.setState({isAuthenticated: true})
			} else {
				this.setState({isAuthenticated: false});
				this.props.history.push('/login');
	
			}
		  })
		  .catch((error) => {
			console.log(error);
		  });
	}

	render() {
		// waits for server to respond before serving page
		if (this.state.isLoading || !this.state.isAuthenticated) {
			return null;
		}

		return(
			<div className="app">
				<h1> Home Page </h1>	
				<Button onClick={this.signOut.bind(this)}>Hi </Button>
			</div>
		);
	}
}

export default Home;
