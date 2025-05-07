import { Navigate, Outlet } from "react-router-dom";

function RequireAuth() {
    const token = localStorage.getItem("token");

    return token? <Outlet/> : <Navigate to="/login" />;
}

export default RequireAuth;
