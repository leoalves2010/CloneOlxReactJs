import Cookies from "js-cookie";

export const isLogged = () => {
    const token = Cookies.get("token");
    return token ? true : false;
};

export const doLogin = async (token, rememberPass = false) => {
    return rememberPass
        ? Cookies.set("token", token, { expires: 999 })
        : Cookies.set("token", token);
};
