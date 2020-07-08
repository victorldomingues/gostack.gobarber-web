import React, { FC, ComponentType } from "react";
import { useAuth } from "../hooks/auth";
import { RouteProps, Route as ReactDOMRoute, Redirect } from "react-router-dom";

interface ReactRouteProps extends RouteProps {
    isPravidate?: boolean;
    component: ComponentType;
}

const Route: FC<ReactRouteProps> = ({ isPravidate, component: Component, ...rest }) => {

    const { user } = useAuth();

    return (<ReactDOMRoute
        {...rest}
        render={({ location }) => {
            return !!isPravidate === !!user ? (
                <Component />
            ) :
                (<Redirect to={{ pathname: isPravidate ? '/' : '/dashboard', state: { from: location } }} />)
        }} />);

};

export default Route;