import React, { useCallBack } from "react";
import db from "../db/index"
import { Button } from 'semantic-ui-react';
import "../css/signup.css";
import pic from '../css/vectorlogo.svg';


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
    <div className="signup">
        <div className="row">
            <div className="left">
                <div className="picture">
                    <img className="picture" src={pic}/>
                </div>
                <div className="leftText">
                    <p1>From the #1 dermatologist recommended brand, comes a cream clinically 
                        proven to reduce the look of wrinkle 5x more than a leading prestige anti-wrinkle product.
                        <br/><br/>We’re not anti-aging, we’re anti-wrinkles™ <br/><br/>We are committed to providing the absolute
                        most prestigious line of products that will make you sparkle.
                    </p1>
                </div>
            </div>

            <div className="right">
                <div className="rightTitle">
                    <h1>Sign Up</h1>
                </div>
                
                <form onSubmit={handleSignUp}>
                    <div>
                        <input className="inputBox" name="name" type="name" placeholder="  Name" />
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
                        <button className="button22" onClick={redirectLogIn}> Back to Login</button>
                    </div>
                </form>
            </div>
        </div>
        <div className="endText">
            <p1>
                © All Rights Reserved. KIWI by Symps.
            </p1>
        </div>
    </div>
    );
};

export default SignUp;