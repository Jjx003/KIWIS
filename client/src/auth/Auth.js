import React, {useEffect, useState, useContext} from "react";
import db from "../db/index";


const AuthContext = React.createContext();
const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() =>
        db.db.auth().onAuthStateChanged(setCurrentUser)
    , []);

    return (
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}

function login(email, password) {
    try {
        db.db.auth().signInWithEmailAndPassword(email, password)
        return true
    } catch(error) {
        console.log(error)
        return false
    }
}


// Specializations
// NAME, LAST_NAME, SPECIALIZATIONS, TAGS, ??
function signUp(email, password, others) {
    try {
        db.db.auth().createUserWithEmailAndPassword(email, password)
    } catch(error) {
        console.log(error)
    }

    // Make calls to firestore database user table to insert other user info.
    // others should be a dictionary of parameters that are asked upon account creation
    // example: others = {name: 'ooga', lastName: 'booga'}
}

function signOut() {
	db.db.auth().signOut();
}

export default {AuthContext, AuthProvider, login, signUp, signOut}
