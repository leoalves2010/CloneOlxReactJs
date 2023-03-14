import * as React from "react";
import { useRoutes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Sobre from "./pages/Sobre/Sobre";

export const Routes = () => {
    return useRoutes([
        { path: "/", element: <Home /> },
        { path: "/sobre", element: <Sobre /> },
        { path: "*", element: <div>Erro 404 - Página não encontrada</div> },
    ]);
};
