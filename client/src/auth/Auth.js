import React, {useEffect, useState, useContext, Suspense} from "react";
import { EventEmitter } from 'events';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Axios from "axios";

const AuthContext = React.createContext();
const UpdateContext = React.createContext();
const ModifyAuthEvent = new EventEmitter();
const cookie = new Cookies();
//const FinishPromise = new Promise();

const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    axios.defaults.withCredentials = true;

    let updateAuth = function() {
        return axios({
            method: 'get', 
            url: 'http://localhost:9000/auth/checkIfSignedIn',
            withCredentials: true}).then((result)=>{
                if(result.data.success) {
                    setCurrentUser(true);
                } else {
                    setCurrentUser(false);
                }
            }).catch((error)=>{
                console.log(error);
                setCurrentUser(false);
            }).then(()=>{
                setLoaded(true);
        })
    }



    
    useEffect(() => {
        //ModifyAuthEvent.on('change', (data)=> {
            updateAuth();
            cookie.addChangeListener((name, value, options) => {
                if (name == 'auth' && value != null && options != null) {
                    console.log("COOKIE CHANGED")
                    axios({
                        method: 'get', 
                        url: 'http://localhost:9000/auth/checkIfSignedIn',
                        withCredentials: true}).then((result)=>{
                            if(result.data.success) {
                                setCurrentUser(true);
                            } else {
                                setCurrentUser(false);
                            }
                        }).catch((error)=>{
                            console.log(error);
                            setCurrentUser(false);
                        }).then(()=>{
                            setLoaded(true);
                    })
                }
            })
            //})
    }, []);

    if (!isLoaded) {
        return <h1>Loading...</h1>
    }
    
    return (
        <UpdateContext.Provider value={updateAuth}>
            <AuthContext.Provider value={{currentUser}}>
                {children}
            </AuthContext.Provider>
        </UpdateContext.Provider>
    )
  
}

export {AuthContext, AuthProvider, ModifyAuthEvent, UpdateContext}