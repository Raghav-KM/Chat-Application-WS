import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/auth";

export const ProtectedRoutes = () => {
    const { loading, loggedIn } = useAuth();
    return loading ? (
        <div className="w-full h-lvh bg-black">Loading...</div>
    ) : loggedIn ? (
        <Outlet />
    ) : (
        <Navigate to={"/login"} />
    );
};
