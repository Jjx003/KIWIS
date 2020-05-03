import React from 'react';
import Navbar from '../components/Navbar'
import ListDisplay from '../components/ListDisplay';

class Home extends React.Component {
	render() {
		return (
			<div>
				<Navbar />
				<ListDisplay />
			</div>
		);
	}
}

export default Home;
