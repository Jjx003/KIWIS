import React from 'react';
import { Button } from 'semantic-ui-react';
import '../css/App.css';
import db from '../db/index.js';

class Home extends React.Component {
	pushData(){
		var company = "bruh", r_owner_id = 111, r_upvote_count = 0, r_post_id = "-M67VDK6MLzICpgZPPPr";
		var r_datetime = "1/11/11 1:11PM", r_content = "New Update", r_endorsed =true;
		db.pushResponse(company, r_owner_id, r_upvote_count, r_post_id, r_datetime, r_content, r_endorsed);

	}

	render() {
		return(
			<div>
				<h1> Home Page </h1>	
				<Button onClick={this.pushData}> Hi </Button>
			</div>
		);
	}
}

export default Home;
