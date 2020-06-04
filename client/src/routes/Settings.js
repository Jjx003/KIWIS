import React from "react";
import { Segment, Divider } from "semantic-ui-react";
import TitleBar from "../components/TitleBar"
import "../css/settings.css";
import { Link } from "react-router-dom";
import axios from 'axios'


class Settings extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user_email: "",
            admin: false
        };

        axios({
            method: 'get',
            url: 'http://localhost:9000/users/getUserEmail'
          }).then((response) => {
            this.setState({user_email: response.data.userEmail});
        });

        axios({
            method: 'get',
            url: 'http://localhost:9000/users/isUserAdmin'
          }).then((response) => {
            this.setState({admin: response.data.admin});
        });
    }

    handleResetPassword = (event) => {
        event.preventDefault();
        // should tag_ids be in line below
        const { password, confirmPassword } = event.target.elements;

        if (password.value !== confirmPassword.value) {
            alert('Please Make Sure the Passwords Match');
            return;
        }

        if (window.confirm("Confirm Reset Password?")) {
            axios({
                method: 'post',
                url: 'http://localhost:9000/auth/resetPassword',
                data: {
                    newPassword: password.value
                }
            }).then(() => {
                alert("Password Changed");
            });
        }
    }

    render() {
        if (this.state.admin) {

            return (
                <div>
                    <TitleBar title="Settings" />
                    <div className="setting">
                        <div className="settingsWrap">
                            <Segment basic textAlign='center'>
                                <div className="settings-item" style={{ paddingLeft: "10px" }}>
                                    Email:     <b>{this.state.user_email}</b>
                                </div>
                                <form onSubmit={this.handleResetPassword.bind(this)}>
                                    <div className="settings-item">
                                        <input className="textBox" name="password" type="password" placeholder="  New Password" />
                                    </div>
                                    <div className="settings-item">
                                        <input className="textBox" name="confirmPassword" type="password" placeholder="  Confirm Password" />
                                    </div>
                                    <div className="settings-item">
                                        <button className="buttonz"> Submit </button>
                                    </div>
                                </form>

                                <div className="instructions">Click below to modify specializations.</div>

                                <div className="settings-item">
                                    <Link to='/userTags'>
                                        <button className="buttonz">  Specializations</button>
                                    </Link>
                                </div>

                                <Divider horizontal> Admins Only </Divider>

                                <div className="settings-item">
                                    <Link to="/adminPage">
                                        <button className="buttonz" onClick={this.redirectAdmin}> Manage Forum </button>
                                    </Link>
                                </div>
                            </Segment>
                        </div>
                        <div className="endText">
                            <p>
                                © All Rights Reserved. KIWI by Symps.
                            </p>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div>
                    <TitleBar title="Settings" />
                    <div className="setting">
                        <div className="settingsWrap">
                            <Segment basic textAlign='center'>
                                <div className="settings-item" style={{ paddingLeft: "10px" }}>
                                    Email:     <b>{this.state.user_email}</b>
                                </div>
                                <form onSubmit={this.handleResetPassword.bind(this)}>
                                    <div className="settings-item">
                                        <input className="textBox" name="password" type="password" placeholder="  New Password" />
                                    </div>
                                    <div className="settings-item">
                                        <input className="textBox" name="confirmPassword" type="password" placeholder="  Confirm Password" />
                                    </div>
                                    <div className="settings-item">
                                        <button className="buttonz"> Submit </button>
                                    </div>
                                </form>

                                <div className="instructions">Click below to modify specializations.</div>

                                <div className="settings-item">
                                    <Link to='/userTags'>
                                        <button className="buttonz">  Specializations</button>
                                    </Link>
                                </div>
                            </Segment>
                        </div>
                        <div className="endText">
                            <p>
                                © All Rights Reserved. KIWI by Symps.
                            </p>
                        </div>
                    </div>
                </div>)
        }
    }
};

export default Settings;