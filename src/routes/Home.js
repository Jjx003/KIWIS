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
				<Link to="/settings">
     				<Button type="button">Log In</Button>
				</Link>
				<div>
					<br></br>
					<Link to="/userTag">
     					<Button type="button">Let me Add some stuff</Button>
					</Link>
			</div>
			</div>
		);
	}
}

export default Home;
