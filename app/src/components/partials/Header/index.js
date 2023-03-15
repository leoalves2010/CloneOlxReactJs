import React from "react";
import { HeaderArea } from "./styled";
import { Link } from "react-router-dom";
import { ReactComponent as LogoOlx } from "../../../assets/logo-olx.svg";
import { isLogged } from "../../helpers/AuthHandler";

const Header = () => {
    const logged = isLogged();

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
                                        <Link to="/loggout">Sair</Link>
                                    </li>
                                    <li>
                                        <Link to="/postad" className="button">
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
                                        <Link to="/signin" className="button">
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
