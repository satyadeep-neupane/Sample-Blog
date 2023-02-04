import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Error from "./pages/Error";

import BlogIndex from "./pages/admin/blog/Index"
import BlogCreate from "./pages/admin/blog/Create"

import UserIndex from "./pages/admin/user/Index"
import UserCreate from "./pages/admin/user/Create"

import ProtectedLayout from "./component/layouts/Protected";
import Login from "pages/auth/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <Error />
    },
    {
        path: "login",
        element: <Login />,
    },
    {
        path: "admin",
        element: <ProtectedLayout />,
        children: [
            {
                path: "blog",
                element: <BlogIndex />
            },
            {
                path: "blog/create",
                element: <BlogCreate />
            },
            {
                path: "user",
                element: <UserIndex />
            },
            {
                path: "user/create",
                element: <UserCreate />
            }
        ]

    }
]);

export default router;