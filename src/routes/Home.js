import React from 'react';
import { Button } from 'semantic-ui-react';
import '../css/App.css';
import ViewPosts from '../components/ViewPosts';

class Home extends React.Component {
	render() {
		return(
			<div>
				<h1> Home Page </h1>	
				<Button> Hi </Button>
				<ViewPosts />
			</div>
		);
	}
}

export default Home;
