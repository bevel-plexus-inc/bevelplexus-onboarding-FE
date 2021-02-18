import React from "react";
import { Route, Redirect, Router } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PrivateRoute = ({
  component: Component,
  ...rest
}) => {
  const userDetails = localStorage.getItem('user')
  return (
    <Route
      {...rest}
      render={(props) =>
        !userDetails ? (
          <Redirect to="/" />
        ) : (
            <Component {...props} />
          )
      }
    />
  );

}

export default PrivateRoute;
