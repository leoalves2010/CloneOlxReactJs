import * as React from "react";
import { useRoutes } from "react-router-dom";
import Home from "./pages/Home/index";
import Sobre from "./pages/Sobre/index";
import NotFound from "./pages/NotFound/index";
import SignIn from "./pages/SignIn/index";

export const Routes = () => {
    return useRoutes([
        { path: "/", element: <Home /> },
        { path: "/about", element: <Sobre /> },
        { path: "/signin", element: <SignIn /> },
        { path: "*", element: <NotFound /> },
    ]);
};
