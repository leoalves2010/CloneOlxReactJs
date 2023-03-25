import * as React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import Home from "./pages/Home/index";
import About from "./pages/About/index";
import NotFound from "./pages/NotFound/index";
import SignIn from "./pages/SignIn/index";
import SignUp from "./pages/SignUp/index";
import AdPage from "./pages/AdPage/index";
import { isLogged } from "./components/helpers/AuthHandler";

export const Routes = () => {
    const logged = isLogged();

    return useRoutes([
        { path: "/", element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/signin", element: <SignIn /> },
        { path: "/signup", element: <SignUp /> },
        { path: "/ad/:id", element: <AdPage /> },
        {
            path: "/post-an-ad",
            element: logged ? <About /> : <Navigate to="/signin" />,
        },
        { path: "*", element: <NotFound /> },
    ]);
};
