import React from "react";
import { Routes } from "./Routes";
import { Template } from "./components/MainComponents";
import Header from "./components/partials/Header/index";
import Footer from "./components/partials/Footer/index";

const App = (props) => {
    return (
        <div>
            <Template>
                <Header />
                <Routes />
                <Footer />
            </Template>
        </div>
    );
};

export default App;
