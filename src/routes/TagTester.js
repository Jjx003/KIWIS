import React from 'react';
import { Button } from 'semantic-ui-react';
import '../css/App.css';
import db from '../db/index.js';
import assert from 'assert';

class TagTester extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            company_name: '',
            tag_name: ''
        };
        this.initializeTagData();
    }

	addTagData() {
		try {
            var result = db.getTags(this.state.company_name);
            console.log(JSON.stringify(result));

            assert(result[this.state.tag_name] !== undefined);
			console.log("No error. Tag already exists");
		} catch {
			db.createNewTag(this.state.company_name, this.state.tag_name);
			console.log("Bruh attempts to create a new tag: " + this.tag_name);
		}
    }
    
    initializeTagData() {
        db.initializeTagData("bruh");
    }


	render() {
		return(
			<div>
				<h1> Tag Tester Page </h1>
                <label> Company Name </label>	
                <input onChange= {e=> this.setState({company_name: e.target.value})} />
                <br />
                <label> Tag Name </label>
                <input onChange= {e=> this.setState({tag_name: e.target.value})} />
                <br />
				<Button onClick={this.addTagData.bind(this)}> Create tag </Button>
                
			</div>
		);
	}
}

export default TagTester;
