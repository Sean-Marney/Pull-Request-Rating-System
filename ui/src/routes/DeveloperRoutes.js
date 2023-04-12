import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useNavigate, Link, Navigate } from "react-router-dom";

const DeveloperRoutes = ({ children, token, role }) => {
    if (!token) {
        return <Navigate to="/login" replace />;
    } else if
    (role !== "Developer") {
    return <Navigate to="/login" replace/>
    } 
    else {
    return children;
};
}
export default DeveloperRoutes;
