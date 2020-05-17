import React from 'react';
import "../css/usertags.css";
import test from "../css/test.json";
import { Link, Router } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';
import {UpdateContext} from '../auth/Auth';

import Cookies from 'universal-cookie';


class UserTags extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            company_name: 'bruh',
            user_name: '',
            tag_name: 'k',
            info: {}
        };

    }
    
    resetTags() {
        console.log("I tried")
    }

    componentWillMount() {
        // db.getAllTags('bruh').then((data) => {
        //     this.setState({info: data.toJSON()});
        //     console.log(this.state.info);
        // });	const handleSignOut = () => {
		axios.defaults.withCredentials = true;
		axios({
			method: 'get',
			url: 'http://localhost:9000/auth/login',
            withCredentials: true,
            data: {
                forumName: this.state.company_name
            }
		  })
		  .then((response) => { 
			console.log(response.data.success);
			if (response.data.success) { 
				this.state.info = response;

			} else {
				console.log("error with tags.");
			}
		  })
		  .catch((error) => {
			console.log(error);
		  });
	}


    render() {
        const {info} = this.state;
        //const tags = Object.keys(info).map(x => { return { key: x, text: x, value: x } });

        return(
            <div>
            <Navbar/>
            <div className="mainTagsPage">
               
                <div className="mainContainer"> 
                    <h1>
                        Specializations Page
                    </h1>
                    <div className="tagListBox">
                        { Object.keys(info).map((key, i) => ( 
                                <button className='tagButton'>{key}</button>
                        ))}
                    </div>
                    <div className="doneButtons">
                        <button onClick={this.resetTags()} className="resetButton">Reset Specializations</button>
                        <Link to="/">
                            <button className="completeButton"> Complete Specializations</button>
                        </Link>
                    </div>
                </div>
                <div className="endText">
                    <p1>
                        © All Rights Reserved. KIWI by Symps.
                    </p1>
                </div>
            </div>
            </div>
        )
    }
}
   

export default UserTags;

