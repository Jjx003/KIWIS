import React, {useContext} from "react";
import {Route, Redirect, withRouter} from "react-router-dom";
import { AuthContext } from "./Auth"

const PrivateRoute = ({component: RouteComponent, ...rest}) => {
    const {currentUser} = useContext(AuthContext);
    console.log(currentUser);
    return (
        <Route
            {...rest}
            render={routeProps =>
                !!currentUser ? <RouteComponent {...routeProps} /> : <Redirect to="/login"/>
            }
        />
    )

}

export default PrivateRoute;