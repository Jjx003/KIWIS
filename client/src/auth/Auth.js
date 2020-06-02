import React, { useEffect, useState } from "react";
import axios from 'axios';
import Cookies from 'universal-cookie';

const AuthContext = React.createContext();
const UpdateContext = React.createContext();
const cookie = new Cookies();

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    axios.defaults.withCredentials = true;

    let updateAuth = function () {
        return axios({
            method: 'get',
            url: 'https://kiwi-test-app.herokuapp.com/auth/checkIfSignedIn',
            withCredentials: true
        }).then((result) => {
            if (result.data.success) {
                setCurrentUser(true);
            } else {
                setCurrentUser(false);
            }
        }).catch((error) => {
            console.log(error);
            setCurrentUser(false);
        }).then(() => {
            setLoaded(true);
        })
    }

    useEffect(() => {
        updateAuth();
        cookie.addChangeListener((name, value, options) => {
            if (name === 'auth' && value != null && options != null) {
                updateAuth();
            }
        })
    }, []);

    if (!isLoaded) {
        return <h1>Loading...</h1>
    }

    return (
        <UpdateContext.Provider value={updateAuth}>
            <AuthContext.Provider value={{ currentUser }}>
                {children}
            </AuthContext.Provider>
        </UpdateContext.Provider>
    )

}

export { AuthContext, AuthProvider, UpdateContext }
