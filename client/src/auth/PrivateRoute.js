import React, {useContext} from "react";
import {Route, Redirect} from "react-router-dom";
import { AuthContext } from "./Auth"

const PrivateRoute = ({component: RouteComponent, dynamic: isDynamic, ...rest}) => {
    const {currentUser} = useContext(AuthContext);
    if (!isDynamic) {
        return (
            <Route
                {...rest}
                render={(routeProps) => (currentUser ? (<RouteComponent {...routeProps} />) : (<Redirect to="/login"/>))
                }
            />
        )
    } else {
        return (
            <Route
            {...rest}
            render={({match}, routeProps) => {
                return (currentUser ? (<RouteComponent {...routeProps} id={match.params.id}  />) : (<Redirect to="/login"/>))
            }}
        />
        )
    }

}

export default PrivateRoute;
