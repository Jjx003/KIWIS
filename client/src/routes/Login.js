import React, {useContext} from "react";
import '../css/login.css';
import Cookies from 'universal-cookie';
import axios from 'axios';
import pic from '../css/vectorlogo.png';
import SignUp from './SignUp';
import {UpdateContext, AuthContext} from "../auth/Auth";

const Login = ({history}) => {
	const {currentUser} = useContext(AuthContext);
    let update = useContext(UpdateContext);

    const handleLogin = (event) => {
		event.preventDefault();
		const {email, password} = event.target.elements;
		// send POST request to sign in user 
		axios({
			method: 'post',
			url: 'http://localhost:9000/auth/login',
			data: {
				email: email.value,
				password: password.value,
			}
		  })
		  .then((response) => {
			if (response.data.success) {
				const cooks = new Cookies();
				cooks.set('auth', response.data.token, {path: '/'});
				// Wait until update processes before redirecting
				update().then(()=>{
					history.replace('/');
				})
			} else {
                alert("Invalid Credentials");
				console.log("invalid credentials.");
			}
		  })
		  .catch((error) => {
			console.log(error);
		  });
	}

        
    const functionalityNotHere = () => {
        alert("functionality Not here");
    }


    return(
        <body className="login">
        <div className="inside">
            
            <div className="columnx">
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
                        <button className="button2" type="button" onClick={functionalityNotHere}>Sign UP</button>
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