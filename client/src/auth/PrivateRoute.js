import React, {useContext} from "react";
import {Route, Redirect} from "react-router-dom";
import { AuthContext } from "./Auth"

<<<<<<< HEAD
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
                //console.log(match.params)
                return (currentUser ? (<RouteComponent {...routeProps} id={match.params.id}  />) : (<Redirect to="/login"/>))
            }}
        />
        )
    }
=======
const PrivateRoute = ({component: RouteComponent, ...rest}) => {
    const {currentUser} = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={(routeProps) => (currentUser ? (<RouteComponent {...routeProps} />) : (<Redirect to="/login"/>))
            }
        />
    )
>>>>>>> creating-posts

}

export default PrivateRoute;
