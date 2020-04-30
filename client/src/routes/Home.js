import React from 'react';
import { Button } from 'semantic-ui-react';
import '../css/App.css';
import Auth from '../auth/Auth';

class Home extends React.Component {
	render() {
		return(
			<div className="app">
				<h1> Home Page </h1>	
				<Button onClick={() => {Auth.signOut()}}> Hi </Button>
			</div>
		);
	}
}

export default Home;
