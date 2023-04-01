import React from "react"
import {Route, Navigate, Outlet} from "react-router-dom"
import Auth from '../Services/Auth'

let ProtectedRoute = () => {
        return Auth.isAuthenticated() ? <Outlet /> : <Navigate to={`/login`} />
}

export default ProtectedRoute;