import React from 'react';
import { Button } from 'semantic-ui-react';
import '../css/App.css';
import db from "../db/data";

class Home extends React.Component {
	
	constructor(props) {
		super(props);

		//this.tagList = this.tagList.bind(this);
		this.state = {
			items: []
		};
		this.fb = db.database().ref('bruh').child('Tags');
		this.fb.on('value', data => {
			let items = [];
			data.forEach(child => {
				let item = child.val();
				item['name'] = child.key;
				items.push(item);
			});
			this.setState({items});
		});

	}
	
	makeTagList() {
		console.log(this.tagList);
	}


	render() {
		const records = this.state.items.map(items =>
			<tr key={items.name}>
				<td style={{width: '200px', textAlign: 'center'}}>{items.name}</td>
				<td style={{width: '200px', textAlign: 'center'}}>{items.count}</td>
			</tr>
		);
		
		return(
			<div style={{paddingTop: '20px'}}>
			<table style={{border: '1px solid black'}}>
				<thead>
					<tr>
						<th>Tag</th>
						<th>Count</th>
					</tr>
				</thead>
				<tbody>
					{records}
				</tbody>
			</table>
		</div>
		);
	}
}

export default Home;
