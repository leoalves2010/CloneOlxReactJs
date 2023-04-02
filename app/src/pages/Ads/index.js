import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { PageArea } from "./styled";
import { PageContainer } from "../../components/MainComponents";
import AdItem from "../../components/partials/AdItem/index";
import { Api } from "../../components/helpers/Api";

let timer;

const Ads = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [stateList, setStateList] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [adList, setAdList] = React.useState([]);
    const [queryInput, setQueryInput] = React.useState(
        searchParams.get("q") !== null ? searchParams.get("q") : ""
    );
    const [queryState, setQueryState] = React.useState(
        searchParams.get("state") !== null ? searchParams.get("state") : ""
    );
    const [queryCategory, setQueryCategory] = React.useState(
        searchParams.get("cat") !== null ? searchParams.get("cat") : ""
    );
    const [opacity, setOpacity] = React.useState(0.3);

    const getAds = async () => {
        const ads = await Api.getAds({
            sort: "desc",
            limit: 9,
            q: queryInput,
            state: queryState,
            cat: queryCategory,
        });
        setAdList(ads);
        setOpacity(1);
    };

    React.useEffect(() => {
        let queryString = [];

        if (queryInput) queryString.push(`q=${queryInput}`);
        if (queryState) queryString.push(`state=${queryState}`);
        if (queryCategory) queryString.push(`cat=${queryCategory}`);

        navigate(`?${queryString.join("&")}`);

        if (timer) clearTimeout(timer);
        timer = setTimeout(getAds, 1000);
        setOpacity(0.3);
    }, [queryInput, queryState, queryCategory, navigate]);

    React.useEffect(() => {
        const getStates = async () => {
            const states = await Api.getStates();
            setStateList(states);
        };
        getStates();
    }, []);

    React.useEffect(() => {
        const getCategories = async () => {
            const categories = await Api.getCategories();
            setCategories(categories);
        };
        getCategories();
    }, []);

    return (
        <>
            <PageContainer>
                <PageArea>
                    <div className="leftSide">
                        <form method="GET">
                            <input
                                type="text"
                                name="q"
                                placeholder="O que você procura?"
                                value={queryInput}
                                onChange={({ target }) =>
                                    setQueryInput(target.value)
                                }
                            />

                            <div className="filterName">Estado:</div>
                            <select
                                name="state"
                                value={queryState}
                                onChange={({ target }) =>
                                    setQueryState(target.value)
                                }
                            >
                                <option></option>
                                {stateList &&
                                    stateList.map((state) => (
                                        <option
                                            key={state._id}
                                            value={state.name}
                                        >
                                            {state.name}
                                        </option>
                                    ))}
                            </select>

                            <div className="filterName">Categoria:</div>
                            <ul>
                                {categories &&
                                    categories.map((category) => (
                                        <li
                                            key={category._id}
                                            className={
                                                queryCategory === category.slug
                                                    ? "categoryItem active"
                                                    : "categoryItem"
                                            }
                                            onClick={() =>
                                                setQueryCategory(category.slug)
                                            }
                                        >
                                            <img
                                                src={category.img}
                                                alt={category.name}
                                            />
                                            <span>{category.name}</span>
                                        </li>
                                    ))}
                            </ul>
                        </form>
                    </div>
                    <div className="rightSide">
                        <h2>Resultados</h2>
                        <div className="list" style={{ opacity }}>
                            {adList.map((ad, k) => (
                                <AdItem key={k} data={ad} />
                            ))}
                        </div>
                    </div>
                </PageArea>
            </PageContainer>
        </>
    );
};

export default Ads;
