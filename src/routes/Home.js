import React from 'react';
import { Button } from 'semantic-ui-react';
import '../css/App.css';
import { Route, Link } from 'react-router-dom';

class Home extends React.Component {
	
	render() {
		return(
			<div>
				<h1> Home Page </h1>	
				<Link to="/signup">
     				<Button type="button">Sign In</Button>
				</Link>
				<Link to="/login">
     				<Button type="button">Log In</Button>
				</Link>
			</div>
		);
	}
}

export default Home;
