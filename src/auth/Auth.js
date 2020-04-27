import React, {useEffect, useState, useContext} from "react";
import db from "../base";


const AuthContext = React.createContext();
const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() =>
        db.auth().onAuthStateChanged(setCurrentUser)
    , []);

    return (
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}

function Login(email, password) {
    try {
        db.auth().signInWithEmailAndPassword(email, password)
        return true
    } catch(error) {
        console.log(error)
        return false
    }
}


// Specializations
// NAME, LAST_NAME, SPECIALIZATIONS, TAGS, ??
function SignUp(email, password, others) {
    try {
        db.auth().createUserWithEmailAndPassword(email, password)
        return true
    } catch(error) {
        console.log(error)
        return false
    }

    // Make calls to firestore database user table to insert other user info.
    // others should be a dictionary of parameters that are asked upon account creation
    // example: others = {name: 'ooga', lastName: 'booga'}
}

export default {AuthContext, AuthProvider, Login, SignUp}