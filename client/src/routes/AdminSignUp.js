import React, { useCallBack } from "react";
import "../css/adminsignup.css";
import axios from 'axios';
import pic from '../css/vectorlogo.png';


const AdminSignUp = ({ history }) => {

    const handleSignUp = (event) => {
        event.preventDefault();
        const { company, first_name, last_name, email, password, passwordcopy } = event.target.elements;

        if(password.value != passwordcopy.value) {
            alert('Please make sure the passwords match.');
            return;
        }

        axios({
            method: 'post',
            url: 'http://localhost:9000/auth/AdminSignUp',
            data: {
                company: company.value,
                first_name: first_name.value,
                last_name: last_name.value,
                email: email.value,
                password: password.value,
            }
        }).then((response) => {
            if (response.data.success) {
                alert("Company Forum successfully made! Welcome to KIWI.")
                redirectLogin();
            } else {
                // update gui to show error in signing up
                console.log("error in sign up, most likely account has already been made");
                alert("Invalid company/email/password. Company or email may already be in use and password must be at least 6 characters.");
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    const redirectLogin = () => {
        history.push("/login")
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
                        <h1>Admin Sign Up</h1>
                    </div>

                    <form onSubmit={handleSignUp}>
                        <div>
                            <input className="inputBox" name="company" type="company" placeholder="  Company" />
                        </div>
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
                            <input className="inputBox" name="passwordcopy" type="password" placeholder="  Re-Enter Password" />
                        </div>
                        <div className="inputBox">
                            <button className="button12" type="submit">Sign Up</button>
                            <button className="button22" onClick={redirectLogin}> Back to Login</button>
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
};

export default AdminSignUp;