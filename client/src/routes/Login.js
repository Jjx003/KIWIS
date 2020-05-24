import React, {useContext} from "react";
import '../css/login.css';
<<<<<<< HEAD
import Cookies from 'universal-cookie';
import { AuthContext, UpdateContext } from "../auth/Auth";
import db from '../auth/firebase';
import axios from 'axios';
import pic from '../css/vectorlogo.png';
import SignUp from './SignUp';

const Login = ({history}) => {
	const {currentUser} = useContext(AuthContext);
    let update = useContext(UpdateContext);

=======
import '../css/App.css';
import Cookies from 'universal-cookie';
import { UpdateContext } from "../auth/Auth";
import db from '../auth/firebase';
import pic from '../css/vectorlogo.png';

const Login = ({history}) => {
    let update = useContext(UpdateContext);
>>>>>>> 12aaeea4d5a8b86e1071b41c40f806bde29648ec

    const handleLogin = (event) => {
		event.preventDefault();
		const {email, password} = event.target.elements;
<<<<<<< HEAD
		// sign in user
		db.auth().signInWithEmailAndPassword(email.value, password.value).then(() => {
            console.log("Entered sign in");
=======

		// sign in user
		db.auth().signInWithEmailAndPassword(email.value, password.value).then(() => {

>>>>>>> 12aaeea4d5a8b86e1071b41c40f806bde29648ec
			// create token for user
			db.auth().currentUser.getIdToken(true).then((idToken) => {
				// store token into cookie 
				const cookies = new Cookies();
				cookies.set('auth', idToken, {path: '/'});
<<<<<<< HEAD
				console.log("Entered create token");
=======
				
>>>>>>> 12aaeea4d5a8b86e1071b41c40f806bde29648ec
				// redirect to home page
				update().then(() => {
					history.push('/');
				});
			})
			.catch((error) => console.log(error));

		}).catch((error) => {
			console.log(error);
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
                        <button className="button2" type="button" onClick={redirectToAdminSignUp}>Sign UP</button>
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