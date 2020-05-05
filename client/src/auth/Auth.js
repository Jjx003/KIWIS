import React, {useEffect, useState, useContext} from "react";
import axios from 'axios';

export const AuthContext = React.createContext();
export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(false);
    axios.defaults.withCredentials = true;
    useEffect(() => {
        async function fetchData() {
            const result = await axios({
                method: 'get', 
                url: 'http://localhost:9000/auth/checkIfSignedIn',
                withCredentials: true});
            
            if(result.data.success) {
                console.log(typeof(currentUser))
                console.log("state: " + currentUser)
                console.log(result.data.success, typeof(result.data.success))
                setCurrentUser(result.data.success);
                console.log("after: " + currentUser)
            }
        }

        fetchData();
    }, []);
    
    return (
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}