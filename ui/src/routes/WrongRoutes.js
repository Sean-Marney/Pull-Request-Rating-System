// if route is not found send to 404 page

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useNavigate, Link, Navigate } from "react-router-dom";

const WrongRoutes = ({ children, token, role }) => {
    if (!children) {
        return <Navigate to="/404" replace />;
    } else if
        (token) {
        return <Navigate to="/login" replace/>
};
}
export default WrongRoutes;