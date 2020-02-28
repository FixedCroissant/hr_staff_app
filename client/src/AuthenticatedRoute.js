import React from "react";
import { Route, Redirect } from "react-router-dom";

//Get our FAKE AUTHENTICATION MOCK....
//import FakeAuth from "./FakeAuth";

//Test our JWT Authentication check.
import Session from "./JWTAuth";


function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
                         <Route
                         {...rest}
                         render={props =>                            
                             Session() ? (
                             <Component {...props} />
                             ) : (
                             <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                             ) 
                         }
                         />
  );
}

export default PrivateRoute;
