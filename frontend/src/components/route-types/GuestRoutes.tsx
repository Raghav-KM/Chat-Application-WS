import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/auth";

export const GuestRoutes = () => {
    const { loading, loggedIn } = useAuth();
    return loading ? (
        <div className="w-full h-lvh bg-black">Loading...</div>
    ) : !loggedIn ? (
        <Outlet />
    ) : (
        <Navigate to={"/dashboard"} />
    );
};
