import React from "react";
import { Redirect, Link } from "react-router-dom";
import db from "../db/index.js"
import '../css/login.css';
import pic from '../css/vectorlogo.svg';
import SignUp from './SignUp';

const Login = ({history}) => {

    const handleLogin = (event) => {
        event.preventDefault();
        const {email, password } = event.target.elements;

        try {
            db.auth().signInWithEmailAndPassword(email.value,password.value);
            history.push("/");
        } catch (error) {
            alert(error);
        }
    }

    const redirectSignUp = () => {
        history.push("/signup")
    }

    // const { currentUser } = useContext(AuthContext);
    // if (currentUser) {
    //     return <Redirect to="/" />;
    // }

    return(
        <body className="login">
        <div className="inside">
            
            <div className="column">
                <img className="pic" src={pic}/>
                <h1 className='font'>Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="textField">
                        <input className="textBox" name="email" type="email" placeholder="  Email" />
                    </div>
                    <div className="textField">
                        <input className="textBox" name="password" type="password" placeholder="  Password" />
                    </div>
                    <div className="buttons">
                        <button className="button1" type="submit">Log In</button>
                        <button className="button2" onClick={redirectSignUp}>Sign UP</button>
                    </div>
                </form>
                
            </div>
        </div>
        <div className="endText">
            <p1>
                © All Rights Reserved. KIWI by Symps.
            </p1>
        </div>
        </body>
    );
};

export default Login;