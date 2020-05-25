import React, { useCallBack, useContext } from "react";
import "../css/signup.css";
import axios from 'axios';
import pic from '../css/vectorlogo.png';
import Cookies from 'universal-cookie';
import db from '../auth/firebase';
import { AuthContext } from "../auth/Auth";
import { Redirect, useHistory } from "react-router-dom";

class SignUp extends React.Component {
	state = {
		isLoading: true,
	}

	handleSignUp = (event) => {
		event.preventDefault();
		const {first_name, last_name, email, password} = event.target.elements;

		axios({
			method: 'post',
			url: 'http://localhost:9000/auth/EmployeeSignUp',
			data: {
				first_name: first_name.value,
				last_name: last_name.value,
				email: email.value,
				password: password.value,
				registration_ID: this.props.match.params.id
			}
		}).then((response) => {
			if (response.data.success) {
				db.auth().signInWithEmailAndPassword(email.value, password.value).then(() => {
					console.log("Entered sign in");
					// create token for user
					db.auth().currentUser.getIdToken(true).then((idToken) => {
						// store token into cookie 
						const cookies = new Cookies();
						cookies.set('auth', idToken, {path: '/'});
						console.log("Entered create token");
						// redirect to home page
						setTimeout(()=>{this.props.history.push("/")}, 3000);
					})
					.catch((error) => console.log(error));
				})
			} else {
				// update gui to show error in signing up
				alert("error in sign up, most likely the email is already being used.");
			}
		}).catch((error) => {
			console.log(error);
		});
	}

	redirectLogin = () => {
		this.props.history.push("/login");
	};

	redirectSpecializations = () => {
		this.props.history.push("/");
	};

	componentDidMount() {
		// check to see if data is valid 
		axios({
			method: 'post',
			url: 'http://localhost:9000/inviteUser/validateID',
			data: {
				uuid: this.props.match.params.id
			}
		  })
		  .then((response) => {
			if (response.data.success) {
				this.setState({isLoading: false});
			} else {
				alert("Invalid RegistrationID");
				this.props.history.push("/login");
			}
		  })
		  .catch((error) => {
			console.log(error);
		  });
	}
	render() {
		if (this.state.isLoading) {
			return <h1> Loading... </h1>
		}

        return (
            <div className="signup">
                <div className="signupRow">
                    <div className="left">
                        <div className="picture">
                            <img className="picture" src={pic} />
                        </div>
                        <div className="leftText">
                            <p1>Our company will ensure the success and coordination of all co-workers.
                            Each company has their own unique tags. Where each employee can also be uniquely
                            identified <br /> <br />Please Signup on the right in order to get started <br /> <br />
                                <br /> <br /> Thank you for choosing KIWI.
                        </p1>
                        </div>
                    </div>
    
                    <div className="right">
                        <div className="rightTitle">
                            <h1>Sign Up</h1>
                        </div>
    
                        <form onSubmit={this.handleSignUp.bind(this)}>
                            <div>
                                <input className="inputBox" name="first_name" type="first_name" placeholder="  First Name" />
                            </div>
                            <div>
                                <input className="inputBox" name="last_name" type="last_name" placeholder="  Last Name" />
                            </div>
                            <div>
                                <input className="inputBox" name="email" type="email" placeholder="  Email" />
                            </div>
                            <div>
                                <input className="inputBox" name="password" type="password" placeholder="  Password" />
                            </div>
                            <div>
                                <input className="inputBox" name="password2" type="password" placeholder="  Re-Enter Password" />
                            </div>
                            <div className="inputBox">
                                <button className="button12" type="submit">Sign Up</button>
                                <button className="button22" onClick={this.redirectLogin.bind(this)}> Back to Login</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="endText">
                    <p1>
                        © All Rights Reserved. KIWI by Symps.
                </p1>
                </div>
            </div >
        );
	}

};

export default SignUp;