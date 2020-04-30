import React, { useCallBack } from "react";
import '../css/App.css';
import db from "../db/index"
import { Button } from 'semantic-ui-react';


const SignUp = ({history}) => {

    const redirectLogIn = () => {
        history.push("/")
    }

    const handleSignUp = (event) => {

        event.preventDefault();
        const { email, password } = event.target.elements;

        try{
            db
                .auth()
                .createUserWithEmailAndPassword(email.value,
                    password.value);
            history.push("/");
        } catch(error){
            alert(error);
        }
    }

    return(
        <div className="centered">
            <h1>Sign Up</h1>
            <form onSubmit={handleSignUp}>
                <label>
                    Email
                    <input name="email" type="email" placeholder="Email" />
                </label>
                <label>
                    Email
                    <input name="password" type="password" placeholder="password" />
                </label>
                <Button type="submit">Sign Up</Button>
            </form>
            <Button onClick={redirectLogIn}> Sign UP</Button>
        </div>
    );
};

export default SignUp;