import React, {useEffect, useState} from "react";
import axios from 'axios';

export const AuthContext = React.createContext();
export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState('');
    const [isLoading, setLoading] = useState('');
    axios.defaults.withCredentials = true;

    useEffect(() => {
        async function fetchData() {
            setLoading('loading');
            const result = await axios({
                method: 'get', 
                url: 'http://localhost:9000/auth/checkIfSignedIn',
                withCredentials: true});
            
            setCurrentUser(result.data.success);
            setLoading('');
        }
        
        fetchData();
    }, []);
    
    return (
        <AuthContext.Provider value={{currentUser, isLoading}}>
            {children}
        </AuthContext.Provider>
    )
}