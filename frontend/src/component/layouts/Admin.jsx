import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";

function Admin()
{
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    );
}

export default Admin;