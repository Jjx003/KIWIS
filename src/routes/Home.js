import React from 'react';
import { Button } from 'semantic-ui-react';
import '../css/App.css';
import db from '../db/index.js';

class Home extends React.Component {
	addTagData() {
		try {
			console.log(db.getTags("bruh"));
			console.log("No error. Tag already exists");
		} catch {
			db.createNewTag("bruh", "annoucements-tester-tag");
			console.log("Bruh has a new tag: annoucements-tester-tag.");
		}
	}


	render() {
		return(
			<div>
				<h1> Home Page </h1>	
				<Button onClick={this.addTagData}> Create annoucements-tester-tag </Button>
			</div>
		);
	}
}

export default Home;
