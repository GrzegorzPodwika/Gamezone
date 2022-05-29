import React, {useContext} from "react";
import {Route, Redirect} from "react-router-dom";
import {UserContext} from "./helpers/UserContext";

export const PrivateRoute = ({component: Component, roles, ...rest}) => {
    const {user} = useContext(UserContext);

    console.log("PRIVATE ROUTE user " + user);

    return (
        <Route
            {...rest}
            render={(props) =>
                user ? (
                    roles && roles.indexOf(user.role) === -1 ? (
                        <Redirect to="/"/>
                    ) : (
                        <Component {...props} />
                    )
                ) : (
                    <Redirect to="/login"/>
                )
            }
        />
    );
};
