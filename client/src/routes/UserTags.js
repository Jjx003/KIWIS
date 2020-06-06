import React from 'react';
import "../css/usertags.css";
import { Link } from 'react-router-dom';
import { Icon } from "semantic-ui-react";
import TitleBar from "../components/TitleBar"
import axios from 'axios';
import SpecializationButton from '../components/SpecializationButton';



class UserTags extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            info: {},
            user_info: {},
            isLoading: true
        };


        // gets the tag list of the company
        axios.defaults.withCredentials = true;
        axios({
            method: 'get',
            url: 'http://localhost:9000/tags/getTags',
            withCredentials: true,
        })
            .then((response) => {
                if (response !== undefined) {
                    this.setState({ info: response.data.tags });

                } else {
                    console.log("error with tags.");
                }
            })
            .catch((error) => {
                console.log(error);
            });


        axios.defaults.withCredentials = true;
        axios({
            method: 'get',
            url: 'https://kiwi-test-app.herokuapp.com/users/userTags',
            withCredentials: true,
        })
            .then((response) => {
                // rechecks if the user has the tag 
                if (response !== undefined) {
                    // updates user
                    this.setState({ user_info: response.data });
                    this.setState({ isLoading: false });
                } else {
                    console.log("error with tags.");
                }
            })
            .catch((error) => {
                console.log(error);
            });

    }


    // just refreshes the page with the tags removed
    resetTags = (event) => {
        event.preventDefault();
        // should tag_ids be in line below
        axios.defaults.withCredentials = true;
        axios({
            method: 'post',
            url: 'http://localhost:9000/users/removeAllUserTags',
            withCredentials: true
        })

            .then((response) => {
                window.location.reload(false);
                if (response.data.success) {
                    // Wait until update processes before redirecting
                    alert("Removed All Tags!");
                    // Redirect to home page
                } else {
                    console("um functional error?");
                }

            })
            .catch((error) => {
                console.log(error);
            });
    }



    render() {
        const { info } = this.state;
        const { user_info } = this.state;

        return (
            <div>
                <TitleBar title="Specializations" />
                <div className="mainTagsPage">
                    <div className="mainContainer">
                        <h1>
                            Select Your Specializations
                        </h1>
                        <div className="tagListBox">
                            {this.state.isLoading ?
                                <div>
                                    <Icon loading name='spinner' /> loading
                            </div>
                                :
                                Object.keys(info).map((key, i) => (<SpecializationButton key={key} user_tags={user_info} tag={key} />))
                            }
                        </div>
                        <div className="doneButtons">
                            <button onClick={this.resetTags} className="resetButton">Clear Specializations</button>
                            <Link to="/settings">
                                <button className="completeButton">Back To Settings</button>
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