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
    const [name, setName] = React.useState("");
    const [stateLoc, setStateLoc] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [stateList, setStateList] = React.useState([]);
    const [disabled, setDisabled] = React.useState(false);
    const [error, setError] = React.useState("");

    React.useEffect(() => {
        const getStates = async () => {
            const stateList = await Api.getStates();
            setStateList(stateList);
        };
        getStates();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setDisabled(true);
        setError("");

        if (password !== confirmPassword) {
            setError("Senhas não batem.");
            setDisabled(false);
            return;
        }

        const json = await Api.register(name, email, password, stateLoc);

        if (json.error) {
            setError(json.error);
        } else {
            doLogin(json.token);
            window.location.href = "/";
        }
        setDisabled(false);
    };

    return (
        <PageContainer>
            <PageTitle>Cadastrar</PageTitle>
            <PageArea>
                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area--title">Nome Completo</div>
                        <div className="area--input">
                            <input
                                type="text"
                                value={name}
                                onChange={({ target }) => setName(target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Estado</div>
                        <div className="area--input">
                            <select
                                required
                                value={stateLoc}
                                onChange={({ target }) =>
                                    setStateLoc(target.value)
                                }
                            >
                                <option>Selecione...</option>
                                {stateList.map((state) => (
                                    <option key={state.id} value={state.name}>
                                        {state.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </label>
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
                        <div className="area--title">Confirmar Senha</div>
                        <div className="area--input">
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={({ target }) =>
                                    setConfirmPassword(target.value)
                                }
                                required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button disabled={disabled}>Fazer Cadastro</button>
                        </div>
                    </label>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                </form>
            </PageArea>
        </PageContainer>
    );
};

export default SignIn;
