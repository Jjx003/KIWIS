import React from 'react';
import { Button } from 'semantic-ui-react';
import '../css/App.css';
import db from '../db/index';

class Home extends React.Component {
	addData() {
		db.addTestData();
		console.log("added data successfully");
	}

	render() {
		return(
			<div>
				<h1> Home Page </h1>	
				<Button onClick={this.addData}> Hi </Button>
			</div>
		);
	}
}

export default Home;
