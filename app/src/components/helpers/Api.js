import Cookies from "js-cookie";
import qs from "qs";

const BASE_API = "http://alunos.b7web.com.br:501";

const apiFetchFiles = async (endpoint, body) => {
    if (!body.token) {
        const token = Cookies.get("token");
        if (token) body.append("token", token);
    }

    const response = await fetch(BASE_API + endpoint, {
        method: "POST",
        body,
    });

    const json = await response.json();

    if (json.notallowed) {
        window.location.href = "/signin";
        return;
    }

    return json;
};

const apiFetchPost = async (endpoint, body) => {
    if (!body.token) {
        const token = Cookies.get("token");
        if (token) body.token = token;
    }

    const response = await fetch(BASE_API + endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    const json = await response.json();

    if (json.notallowed) {
        window.location.href = "/signin";
        return;
    }

    return json;
};

const apiFetchGet = async (endpoint, body = []) => {
    if (!body.token) {
        const token = Cookies.get("token");
        if (token) body.token = token;
    }

    const response = await fetch(
        `${BASE_API + endpoint}?${qs.stringify(body)}`
    );

    const json = await response.json();

    if (json.notallowed) {
        window.location.href = "/signin";
        return;
    }

    return json;
};

export const Api = {
    login: async (email, password) => {
        const json = await apiFetchPost("/user/signin", { email, password });
        return json;
    },
    register: async (name, email, password, stateLoc) => {
        const json = await apiFetchPost("/user/signup", {
            name,
            email,
            password,
            state: stateLoc,
        });
        return json;
    },
    getStates: async () => {
        const json = await apiFetchGet("/states");
        return json.states;
    },
    getCategories: async () => {
        const json = await apiFetchGet("/categories");
        return json.categories;
    },
    getAds: async (options) => {
        const json = await apiFetchGet("/ad/list", options);
        return json.ads;
    },
    getAd: async (id, other = false) => {
        const json = await apiFetchGet("/ad/item", { id, other });
        return json;
    },
    addAd: async (fData) => {
        const json = await apiFetchFiles("/ad/add", fData);
        return json;
    },
};
