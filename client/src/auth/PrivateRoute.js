import React, {useContext} from "react";
import {Route, Redirect, withRouter} from "react-router-dom";
import { AuthContext } from "./Auth"

const PrivateRoute = ({component: RouteComponent, ...rest}) => {
    const {currentUser} = useContext(AuthContext);
    console.log(currentUser);
    console.log("we navigating here??")
    console.log(currentUser, " is current");
    console.log(RouteComponent)
    return (
        <Route
            {...rest}
            render={(routeProps) => (currentUser===true ? (<RouteComponent {...routeProps} />) : (<Redirect to="/login"/>))
            }
        />
    )

}

export default PrivateRoute;