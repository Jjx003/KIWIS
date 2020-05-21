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
            info: {},
            user_info: {}
        };


        // gets the tag list of the company
        axios.defaults.withCredentials = true;
		axios({
			method: 'post',
			url: 'http://localhost:9000/tags/getTags',
            withCredentials: true,
		  })
		  .then((response) => { 
			if (response != undefined) { 
                this.setState({info: response.data});   

			} else {
				console.log("error with tags.");
			}
		  })
		  .catch((error) => {
			console.log(error);
          });
          

        // gets the user tags list
        axios.defaults.withCredentials = true;
		axios({
			method: 'post',
			url: 'http://localhost:9000/users/userTags',
            withCredentials: true,
		  })
		  .then((response) => { 
              console.log(response.data);
			if (response != undefined) { 
                this.setState({user_info: response.data});   

			} else {
				console.log("error with tags.");
			}
		  })
		  .catch((error) => {
			console.log(error);
		  });
    }
    
    resetTags() {
        console.log("I tried")
    }


    render() {
        const {info} = this.state;
        const {user_info} = this.state;
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

