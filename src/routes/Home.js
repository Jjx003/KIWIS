import React from 'react';
import '../css/App.css';
import ViewPosts from '../components/ViewPosts';
import ViewResponses from '../components/ViewResponses';
import ViewResponse from '../components/ViewResponses';

class Home extends React.Component {
	render() {
		return(
			<div>
				<ViewPosts />
				<ViewResponse />
				<ViewResponse />
				<ViewResponse />
				<ViewResponse />

			</div>
		);
	}
}

export default Home;
