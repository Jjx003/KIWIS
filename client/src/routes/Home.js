import React from 'react';
import { Button } from 'semantic-ui-react';
import '../css/App.css';
import firebase from '../auth/firebase';

import Cookies from 'universal-cookie';
import HomePosts from '../components/HomePosts'

const Home = ({ history }) => {

	const createPost = () => {

		history.push('/createPost');


	}

	const handleSignOut = () => {
		firebase.auth().signOut();

		// removing cookie
		const cookies = new Cookies();
		cookies.remove('auth');

		// redirect to home page
		history.push("/login");
	}


	return (
		<div className="app">
			<HomePosts />
			<Button onClick={handleSignOut}>Signout</Button>
			<Button onClick={createPost}>Create Post</Button>
		</div>
	);
}

export default Home;