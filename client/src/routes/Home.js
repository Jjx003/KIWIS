import React from 'react';
import '../css/App.css';
import HomePosts from '../components/HomePosts'

const Home = ({ history }) => {

	return (
		<div className="app">
			<HomePosts />
		</div>
	);
}

export default Home;