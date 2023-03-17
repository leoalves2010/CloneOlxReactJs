import React from "react";
import { PageArea } from "./styled";
import {
    PageContainer,
    PageTitle,
    ErrorMessage,
} from "../../components/MainComponents";
import { Api } from "../../components/helpers/Api";
import { doLogin } from "../../components/helpers/AuthHandler";

const SignIn = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [rememberPass, setRememberPass] = React.useState(false);
    const [disabled, setDisabled] = React.useState(false);
    const [error, setError] = React.useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setDisabled(true);

        const json = await Api.login(email, password);

        if (json.error) {
            setError(json.error);
        } else {
            doLogin(json.token, rememberPass);
            window.location.href = "/";
        }
    };

    return (
        <PageContainer>
            <PageTitle>Login</PageTitle>
            <PageArea>
                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area--title">E-mail</div>
                        <div className="area--input">
                            <input
                                type="email"
                                value={email}
                                onChange={({ target }) =>
                                    setEmail(target.value)
                                }
                                required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Senha</div>
                        <div className="area--input">
                            <input
                                type="password"
                                value={password}
                                onChange={({ target }) =>
                                    setPassword(target.value)
                                }
                                required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Lembrar a senha?</div>
                        <div className="area--input">
                            <input
                                type="checkbox"
                                checked={rememberPass}
                                onChange={() => setRememberPass(!rememberPass)}
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button disabled={disabled}>Fazer Login</button>
                        </div>
                    </label>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                </form>
            </PageArea>
        </PageContainer>
    );
};

export default SignIn;
