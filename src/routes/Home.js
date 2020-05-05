import React from 'react';
import Navbar from '../components/Navbar'
import ListDisplay from '../components/ListDisplay'
import Posts from '../components/Posts.js'

class Home extends React.Component {
	render() {
		return (
			<div>
				<Navbar />
				<ListDisplay />
				<Posts/>
			</div>
		);
	}
}

export default Home;
