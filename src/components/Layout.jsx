import { Outlet, useLocation, useNavigate } from "react-router";
import Sidebar from "./common/Sidebar";
import { useEffect } from "react";

const Layout = () => {

    // Hide the sidebar on specific routes like "/login" or "/register"
    const hideSidebarRoutes = ["/login", "/register"];
    const shouldHideSidebar = hideSidebarRoutes.includes(location.pathname);

    const navigate = useNavigate();
    // Retrieve  user from localStorage
    const user = JSON.parse(localStorage.getItem("user"));


    // Check if user is logged in
    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    return (
        <div className="flex">
            {!shouldHideSidebar && <Sidebar user={user} />}
            <div className="flex-grow">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;