import React from 'react';
import { Button } from 'semantic-ui-react';
import '../css/App.css';
import ViewResponses from '../components/ViewResponses.js';

class Home extends React.Component {
	render() {
		return(
			<div>
				<h1> Home Page </h1>	
				<Button> Hi </Button>
			</div>
		);
	}
}

export default Home;
