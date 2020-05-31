import React, {useContext} from "react";
import '../css/login.css';
import Cookies from 'universal-cookie';
import { UpdateContext } from "../auth/Auth";
import db from '../auth/firebase';
import '../css/App.css';
import pic from '../css/vectorlogo.png';

const Login = ({history}) => {
    let update = useContext(UpdateContext);

    const handleLogin = (event) => {
		event.preventDefault();
		const { email, password } = event.target.elements;


		// sign in user
		db.auth().signInWithEmailAndPassword(email.value, password.value).then(() => {

			// create token for user
			db.auth().currentUser.getIdToken(true).then((idToken) => {
				// store token into cookie 
				const cookies = new Cookies();
				cookies.set('auth', idToken, { path: '/' });

				// redirect to home page
				update().then(() => {
					history.push('/');
				});
			})
				.catch((error) => console.log(error));

		}).catch((error) => {
            console.log(error);
            alert('Invalid Credentials');
		});
	}

        
    const redirectToAdminSignUp = () => {
        history.push('/adminsignup');
    }


    return(
        <div className="login">
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
                        <button className="button2" type="button" onClick={redirectToAdminSignUp}>Sign Up</button>
                    </div>
                </form>
                
            </div>
        </div>
        <div className="endText">
            <p>
                © All Rights Reserved. KIWI by Symps.
            </p>
        </div>
        </div>
    );
};

export default Login;
