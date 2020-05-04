import React, {useContext} from "react";
import {Route, Redirect} from "react-router-dom";


const PrivateRoute = ({component: RouteComponent, ...rest}) => {

    var currentUser;
    // sends GET request to check if logged in

    fetch('http://localhost:9000/auth/login')
			.then(response => response.json())
            .then((data) => { 
                currentUser=data.success; ;	
            
                return (
                    <Route
                    {...rest}
                    render={routeProps =>
                    !!currentUser ? <RouteComponent {...routeProps} /> : <Redirect to="/login"/>
                    }
                    />
                )
            }
    )
    
}

export default PrivateRoute
