import React from "react";
import { HeaderArea } from "./styled";
import { Link } from "react-router-dom";
import { ReactComponent as LogoOlx } from "../../../assets/logo-olx.svg";
import { isLogged, doLogout } from "../../helpers/AuthHandler";

const Header = () => {
    const logged = isLogged();

    const handleLogout = () => {
        doLogout();
        window.location.href = "/signin";
    };

    return (
        <div>
            <HeaderArea>
                <div className="container">
                    <div className="logo">
                        <Link to={"/"}>
                            <LogoOlx height={40} />
                        </Link>
                    </div>
                    <nav>
                        <ul>
                            {logged && (
                                <>
                                    <li>
                                        <Link to="/myaccount">Minha Conta</Link>
                                    </li>
                                    <li>
                                        <button onClick={handleLogout}>
                                            Sair
                                        </button>
                                    </li>
                                    <li>
                                        <Link to="/post-an-ad" className="button">
                                            Poste um Anúncio
                                        </Link>
                                    </li>
                                </>
                            )}

                            {!logged && (
                                <>
                                    <li>
                                        <Link to="/signin">Login</Link>
                                    </li>
                                    <li>
                                        <Link to="/signup">Cadastrar</Link>
                                    </li>
                                    <li>
                                        <Link to="/post-an-ad" className="button">
                                            Poste um Anúncio
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </nav>
                </div>
            </HeaderArea>
        </div>
    );
};

export default Header;
